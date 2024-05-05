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
  const h: Record<string, string> = {
    jobType: "0df255ab6f3965e22ecc6f00d9f63deaec26f1ab",
    jobSource: "73b6d28bc81b8765e83ed768564b9f3486fe3efa",
    jobDescription: "5f114679dc575a1f832e58ee643a2c63039ac7c3",

    address: "603b01e987d54c74b14805ea303c9f46bec4e4b8",
    area: "1905c713f6293d46b9de252e72ea687eaf95ccff",

    startDate: "129f808c5f9a350096036b1c5dcffe9cd3ee3090",
    startTime: "9432e8fd99fb17a217f6be32930e7222483cdff7",
    endTime: "6a79ed9f464658c1caf615b597b4f3ec62062058",
    testSelect: "7440f2cdde40c48c4e6b5d2ea27f2ed0d3a6b59c",
  };
  const formData: Record<string, string> = {};
  const parsedData = decodeURIComponent(req.body as string).split("&");
  const fullAddress: Record<string, string> = {
    address: "",
    city: "",
    state: "",
    zipCode: "",
  };
  for (const data of parsedData) {
    const [key, value] = data.split("=");
    if (["address", "city", "state", "zipCode"].includes(key)) {
      fullAddress[key] = value;
    } else if (key == "jobType") {
      formData.title = value || "test"; // no validation
      formData[h[key]] = value;
    } else if (["firstName", "lastName", "phone", "email"].includes(key)) {
      console.log(key, value);
    } else {
      formData[h[key]] = value;
    }
  }
  formData[
    h.address
  ] = `${fullAddress.zipCode} ${fullAddress.address} ${fullAddress.city} ${fullAddress.state}`;

  try {
    const api = new pipedrive.DealsApi(apiClient);
    const opts = pipedrive.NewDeal.constructFromObject(formData);
    await api.addDeal(opts);
    return res.send("Job created");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error); // validation errors
  }
}) as RequestHandler);

export const handler = serverless(app);
