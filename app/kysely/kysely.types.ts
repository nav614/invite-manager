import { ColumnType, Generated, Insertable, Selectable } from "kysely";

type Permission =
  | "read_posts"
  | "write_posts"
  | "read_messages"
  | "write_messages"
  | "read_profile"
  | "write_profile";

interface UserTable {
  id: Generated<number>;
  email: string;
  password: string;
  is_verified: boolean;
}

interface InviteTable {
  id: Generated<number>;
  inviter_id: number;
  invitee_id: number;
  is_accepted: boolean;
  is_pending: boolean;
  permissions: Permission[];
  expiration_date: ColumnType<Date | null, string | undefined, never>;
  invite_date: ColumnType<Date, string | undefined, never>;
  accepted_at: ColumnType<Date | null, string | undefined, never>;
}

export interface Database {
  users: UserTable;
  invites: InviteTable;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;

export type Invite = Selectable<InviteTable>;
export type NewInvite = Insertable<InviteTable>;
