import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { hashPassword } from "../utils/hash";
import { useAppSession } from "../utils/session";
import { Login } from "../components/Login";
import { db } from "../kysely/db";

export const loginFn = createServerFn(
  "POST",
  async (payload: { email: string; password: string }) => {
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", payload.email)
      .executeTakeFirst();

    if (!user) {
      return {
        error: true,
        userNotFound: true,
        message: "User not found",
      };
    }

    const hashedPassword = await hashPassword(payload.password);

    if (user.password !== hashedPassword) {
      return {
        error: true,
        message: "Incorrect password",
      };
    }

    const session = await useAppSession();

    await session.update({
      userEmail: user.email,
    });
  }
);

export const Route = createFileRoute("/_authorized")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === "Not authenticated") {
      return <Login />;
    }

    throw error;
  },
});
