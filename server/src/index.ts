import dotenv from "dotenv";
dotenv.config(); // 환경 변수를 활용하는 다른 로직들보다 앞에 있어야 한다.
import express, { json } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Memo } from "./entities/Memo";
import { User } from "./entities/User";
import {
  errorHandler,
  noResponseHandler,
} from "./middlewares/exceptionHandler";
import { sessionHandler } from "./middlewares/sessionHandler";
import userRouter from "./router/userRouter";

const app = express();

(async () => {
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Memo],
    // migrations: ["src/migration/**/*.ts"],
    // subscribers: ["src/subscriber/**/*.ts"],
  });

  app.use(sessionHandler);

  app.use(json());
  app.use("/user", userRouter);

  // url과 일치하는 미들웨어가 존재하지 않을 때
  app.use(noResponseHandler);
  // 에러 처리(next(Error) 호출하면 이 미들웨어를 실행한다)
  app.use(errorHandler);

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`listening to port : ${port}`);
  });
})();
