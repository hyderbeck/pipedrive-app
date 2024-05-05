import express, { RequestHandler, Router } from "express";
import serverless from "serverless-http";

import pipedrive from "pipedrive";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

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

const api = Router();
app.use("/api", api);

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

api.post("/jobs/new", (async (req, res) => {
  const jobFields = [
    "Job type",
    "Job source",
    "Job description",
    "Address",
    "Area",
    "Job date",
    "Job start time",
    "Job end time",
    "Test select",
  ];
  const dealFieldsApi = new pipedrive.DealFieldsApi(apiClient);
  const { data } = await dealFieldsApi.getDealFields();
  const jobFieldKeys = jobFields.map((field) => {
    return {
      name: field,
      key: data.find((d) => d.name == field)?.key as string,
    };
  });

  const formData: Record<string, string> = {};
  const parsedData = decodeURIComponent(req.body as string)
    .split("&")
    .map((data) => data.replace(/\+/g, " "));
  for (const data of parsedData) {
    const [name, value] = data.split("=");
    if (
      [
        "first_name",
        "last_name",
        "phone",
        "email",
        "city",
        "state",
        "zip_code",
      ].includes(name)
    ) {
      console.log(name, value);
    } else {
      formData[jobFieldKeys.find((field) => field.name == name)!.key] = value;
    }
  }
  formData.title = "test";

  const dealsApi = new pipedrive.DealsApi(apiClient);
  const opts = pipedrive.NewDeal.constructFromObject(formData);
  await dealsApi.addDeal(opts);
  return res.send("Job created");
}) as RequestHandler);

export const handler = serverless(app);
