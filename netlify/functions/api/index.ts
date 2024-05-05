import express, { RequestHandler, Router } from "express";
import serverless from "serverless-http";

import pipedrive from "pipedrive";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import { randomUUID } from "crypto";
import { fmtFormData } from "./utils";
import { addDeal } from "./queries";

const app = express();

app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

const apiClient = new pipedrive.ApiClient();

// auth

const oauth2 = apiClient.authentications.oauth2;
oauth2.clientId = process.env.CLIENT_ID!;
oauth2.clientSecret = process.env.CLIENT_SECRET!;
oauth2.redirectUri = process.env.REDIRECT_URI!;

const login = Router();
app.use("/login", login);

login.get("/", (_req, res) => {
  const authUrl = apiClient.buildAuthorizationUrl();
  res.redirect(authUrl as string);
});

login.get("/callback", (async (req, res) => {
  if (req.query.error) {
    res.redirect("/?=");
    return;
  }
  try {
    const authCode = req.query.code;
    await apiClient.authorize(authCode);
    req.session!.refreshToken = apiClient.authentications.oauth2.refreshToken;
    res.redirect("/?=");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}) as RequestHandler);

// api
// TODO: refactor

const api = Router();
app.use("/api", api);

api.use((req, _res, next) => {
  apiClient.authentications.oauth2.refreshToken = req.session!.refreshToken;
  next();
});

api.get("/user", (async (_req, res) => {
  try {
    const api = new pipedrive.UsersApi(apiClient);
    const { data } = await api.getCurrentUser();
    return res.send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}) as RequestHandler);

api.post("/jobs", (async (req, res) => {
  const dealFieldsApi = new pipedrive.DealFieldsApi(apiClient);
  const dealFieldsData = (await dealFieldsApi.getDealFields()).data;
  const title = `Job ${randomUUID().slice(0, 8)}`;
  let formData = {};
  try {
    formData = fmtFormData(
      req.body as string,
      title,
      dealFieldsData as Record<string, string>[]
    );
  } catch (error) {
    return res.status(400).send("Bad request");
  }

  const dealId = await addDeal(pipedrive, apiClient, formData, title);

  const notesApi = new pipedrive.NotesApi(apiClient);
  const noteOpts = pipedrive.AddNoteRequest.constructFromObject({
    content: "Job created",
    dealId,
  });
  await notesApi.addNote(noteOpts);

  return res.send(dealId);
}) as RequestHandler);

// TODO: api.get(job) by id

export const handler = serverless(app);
