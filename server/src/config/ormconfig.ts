import path from "path";
import { ConnectionOptions } from "typeorm";
import { __test__, __prod__ } from "../constants";
import env from "./dotenvConfig";
const myConnectionOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: env.DB_USER_NAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: !__prod__,
  logging: true,
  entities: [
    __test__
      ? path.resolve(".", "src", "entities/**/*.ts")
      : path.resolve(".", "dist", "entities/**/*.js"),
  ],
  migrations: !__prod__ ? undefined : ["dist/migration/**/*.js"],
  cli: { migrationsDir: "src/migration" },
  migrationsRun: __prod__,
  // subscribers: ["src/subscriber/**/*.ts"],
};

export default myConnectionOptions;
