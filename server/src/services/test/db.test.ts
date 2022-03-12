import { Connection } from "typeorm";
import { dbConnectionPromise } from "../../config/typeorm";
import MemoServiceTest from "./MemoServiceTest";
import UserServiceTest from "./UserServiceTest";

// 단일 커넥션으로 모든 테스트 해결
describe("Service Layer Test", () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await dbConnectionPromise;
  });

  MemoServiceTest();
  UserServiceTest();

  afterAll(async () => {
    connection.close();
  });
});
