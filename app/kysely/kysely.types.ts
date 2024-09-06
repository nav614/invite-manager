import { Generated, Insertable, Selectable } from "kysely";

export interface UserTable {
  id: Generated<number>;
  email: string;
  password: string;
}

export interface Database {
  users: UserTable;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
