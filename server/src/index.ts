import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";

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

  app.get("/", (_, res) => {
    res.send("hello world!");
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
