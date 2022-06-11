/* eslint-disable @typescript-eslint/no-var-requires */
import api from "./api";
import logger from "./logger";

const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const httpModule = require("http");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8000;

mongoose.connect(
  dev ? process.env.CLUSTER_MONGO_URL_TEST : process.env.CLUSTER_MONGO_URL,
  {
    bufferCommands: false,
  }
);

const server = express();

server.use(
  cors({
    origin: process.env.URL_APP,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

server.use(helmet());
server.use(compression());
server.use(express.json({ limit: "200mb" }));

const sessionOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: dev
      ? process.env.CLUSTER_MONGO_URL_TEST
      : process.env.CLUSTER_MONGO_URL,
    ttl: 14 * 24 * 60 * 60, // save session 14 days
    autoRemove: "interval",
    autoRemoveInterval: 1440, // clears every day
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
    domain: dev ? "localhost" : process.env.COOKIE_DOMAIN,
  } as any,
};

if (!dev) {
  server.set("trust proxy", 1); // sets req.hostname, req.ip
  sessionOptions.cookie.secure = true; // sets cookie over HTTPS only
}

const sessionMiddleware = session(sessionOptions);
server.use(sessionMiddleware);

api(server);

const httpServer = httpModule.createServer(server);

server.get("*", (_, res) => {
  res.sendStatus(403);
});

httpServer.listen(port, () => {
  logger.info(
    `Refresh ${dev ? process.env.URL_API : process.env.PRODUCTION_URL_API}`
  );
  logger.debug("null");
});
