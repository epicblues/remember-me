import "reflect-metadata";
import env from "./config/dotenvConfig";
import express, { json } from "express";
import { dbConnectionPromise } from "./config/typeorm";
import { authHandler } from "./middlewares/authHandler";
import {
  errorHandler,
  noResponseHandler,
} from "./middlewares/exceptionHandler";
import { sessionHandler } from "./middlewares/sessionHandler";
import memoRouter from "./router/memo";
import userRouter from "./router/user";

const app = express();

(async () => {
  await dbConnectionPromise;
  app.use(sessionHandler);

  app.use(json());
  app.use("/user", userRouter);

  // Memo는 회원만 이용할 수 있다.
  app.use("/memo", authHandler, memoRouter);

  // url과 일치하는 미들웨어가 존재하지 않을 때
  app.use(noResponseHandler);
  // 에러 처리(next(Error) 호출하면 이 미들웨어를 실행한다)
  app.use(errorHandler);

  const port = env.PORT;
  app.listen(port, () => {
    console.log(`listening to port : ${port}`);
  });
})();
