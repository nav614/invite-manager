import { Kysely, PostgresDialect } from "kysely";
import { Database } from "./kysely.types";
import pkg from "pg";

const { Pool } = pkg;

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL as string,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
