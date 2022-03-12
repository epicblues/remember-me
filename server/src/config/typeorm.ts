import path from "path";
import { createConnection } from "typeorm";
import { __test__ } from "../constants";
import env from "./dotenvConfig";

export const dbConnectionPromise = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: env.DB_USER_NAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: __test__,
  logging: true,
  entities: [
    __test__
      ? path.resolve(".", "src", "entities/**/*.ts")
      : path.resolve(".", "dist", "entities/**/*.js"),
  ],
  migrations: __test__ ? undefined : ["src/migration/**/*.ts"],
  // subscribers: ["src/subscriber/**/*.ts"],
});
