import express, { RequestHandler } from "express";
import serverless from "serverless-http";
import { OAuth2Configuration, TokenResponse } from "pipedrive";
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

const oauth2 = new OAuth2Configuration({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  redirectUri: process.env.REDIRECT_URI!,
});

// auth

app.get("/login", (req, res) => {
  try {
    const token = oauth2.updateToken(
      req.session?.accessToken as TokenResponse | null
    ) as TokenResponse | null;
    if (!token) {
      const authUrl = oauth2.authorizationUrl;
      res.redirect(authUrl);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

app.get("/login/callback", (async (req, res) => {
  try {
    if (req.query.error) {
      res.redirect("/");
    } else {
      const authCode = req.query.code as string;
      const newAccessToken = await oauth2.authorize(authCode);
      req.session!.accessToken = newAccessToken;
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}) as RequestHandler);

// api

app.get("/api", (req, res) => {
  const token = oauth2.updateToken(
    req.session?.accessToken as TokenResponse | null
  ) as TokenResponse | null;
  if (!token) {
    return res.send("Not logged in");
  } else {
    return res.send("OK");
  }
});

export const handler = serverless(app);