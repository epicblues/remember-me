import dotenv from "dotenv";
dotenv.config(); // 환경 변수를 활용하는 다른 로직들보다 앞에 있어야 한다.
import express, { json } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { errorHandler } from "./middlewares/errorHandler";
import { sessionHandler } from "./middlewares/sessionHandler";
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

  app.use(sessionHandler);

  app.use(json());
  app.use("/user", userRouter);

  app.get("/error", (_, __, next) => {
    next(new Error("error testing"));
  });

  // 에러 처리
  // 이전 미들웨어에서 next(error)를 호출하면 이 미들웨어로 요청 처리
  app.use(errorHandler);

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`listening to port : ${port}`);
  });
})();
