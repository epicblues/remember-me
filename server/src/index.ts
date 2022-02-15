import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import { COOKIE_NAME, __prod__ } from "./constants";
import userRouter from "./router/user";

const app = express();

(async () => {
  await createConnection({
    type: "mysql",
    host: "mysql",
    port: 3306,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
    // migrations: ["src/migration/**/*.ts"],
    // subscribers: ["src/subscriber/**/*.ts"],
  });

  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: "redis",
  });

  app.use(
    session({
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
    })
  );

  app.use(json());
  app.use("/user", userRouter);

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`listening to port : ${port}`);
  });
})();
