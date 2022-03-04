import connectRedis from "connect-redis";
import { RequestHandler } from "express";
import session from "express-session";
import { __prod__ } from "../constants";
import Redis from "ioredis";
import env from "../config/dotenvConfig";

const RedisStore = connectRedis(session);
const redis = new Redis();
export const sessionHandler: RequestHandler = session({
  name: env.COOKIE_NAME,
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
  secret: env.SESSION_SECRET,
  resave: false,
});
