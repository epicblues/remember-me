import path from "path";
import { createConnection } from "typeorm";
import env from "./dotenvConfig";

export const dbConnectionPromise = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: env.DB_USER_NAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [path.resolve(".", "dist", "entities/**/*.js")],
  // migrations: ["src/migration/**/*.ts"],
  // subscribers: ["src/subscriber/**/*.ts"],
});
