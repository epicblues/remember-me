import { createConnection } from "typeorm";
import myConnectionOptions from "./ormconfig";

export const dbConnectionPromise = createConnection(myConnectionOptions);
