import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import { COOKIE_NAME, __prod__ } from "./constants";

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

  app.get("/", (req, res) => {
    const mySession = req.session as Express.Request["session"] & {
      userName: string;
    };
    console.log(mySession);
    if (mySession.userName) {
      res.send(`hello ${mySession.userName} you logined`);
    } else {
      mySession.userName = "KMS" + Math.floor(Math.random() * 9);
      // mySession.save();
      res.send(`hello ${mySession.userName}`);
    }
  });

  app.get("/join/:name", async (req, res) => {
    const name = req.params.name;
    if (!name) {
      return res.send("no name");
    }
    const user = User.create({ name });
    await User.save(user);

    return res.send(user.name);
  });

  app.get("/user", async (_, res) => {
    const users = await User.find();

    res.json(users);
  });

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`listening to port : ${port}`);
  });
})();
