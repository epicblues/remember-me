import connectRedis from "connect-redis";
import { RequestHandler } from "express";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "../constants";
import Redis from "ioredis";

const RedisStore = connectRedis(session);
const redis = new Redis({
  host: "redis",
});
export const sessionHandler: RequestHandler = session({
  name: COOKIE_NAME,
  store: new RedisStore({
    client: redis,
    disableTouch: true,
    disableTTL: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    httpOnly: true,
    sameSite: "lax",
    secure: __prod__,
  },
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET!,
  resave: false,
});
