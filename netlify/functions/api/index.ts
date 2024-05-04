/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { RequestHandler, Router } from "express";
import serverless from "serverless-http";
import pipedrive from "pipedrive";
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

const oauth2 = apiClient.authentications.oauth2;
oauth2.clientId = process.env.CLIENT_ID!;
oauth2.clientSecret = process.env.CLIENT_SECRET!;
oauth2.redirectUri = process.env.REDIRECT_URI!;

// auth

const login = Router();
app.use("/login", login);

login.get("/", (req, res) => {
  if (req.session?.accessToken) {
    res.redirect("/?=");
  } else {
    const authUrl = apiClient.buildAuthorizationUrl();
    res.redirect(authUrl);
  }
});

login.get("/callback", (async (req, res) => {
  if (req.query.error) {
    res.redirect("/?=");
    return;
  }
  const authCode = req.query.code;
  try {
    await apiClient.authorize(authCode);
    req.session!.accessToken = apiClient.authentications.oauth2.accessToken;
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}) as RequestHandler);

// api

const api = Router();
app.use("/api", api);

api.get("/username", (async (req, res) => {
  if (!req.session?.accessToken) {
    return res.send("None");
  } else {
    const api = new pipedrive.UsersApi(apiClient);
    const username = (await api.getCurrentUser()).data!.name;
    return res.send(username);
  }
}) as RequestHandler);

export const handler = serverless(app);
