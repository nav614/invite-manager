import { createServerFn, useServerFn } from "@tanstack/start";
import { db } from "~/kysely/db";
import { useAppSession } from "~/utils/session";
import { useQuery } from "@tanstack/react-query";
import { UserUI } from "~/kysely/kysely.types";

const getAllUsers = createServerFn("GET", async () => {
  const session = await useAppSession();

  if (!session.data.userEmail) {
    return [];
  }

  const users = await db
    .selectFrom("users")
    .select(["id", "email", "is_verified"])
    .execute();

  return users as UserUI[];
});

export const useUsers = () => {
  const getUsers = useServerFn(getAllUsers);

  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    initialData: [],
  });
};
