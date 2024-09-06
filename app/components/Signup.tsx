import { redirect } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";
import { Auth } from "./Auth";
import { useMutation } from "../hooks/useMutation";
import { db } from "../kysely/db";
import { hashPassword } from "../utils/hash";
import { useAppSession } from "../utils/session";

export const signupFn = createServerFn(
  "POST",
  async (payload: {
    email: string;
    password: string;
    redirectUrl?: string;
  }) => {
    // Check if the user already exists
    const found = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", payload.email)
      .executeTakeFirst();

    // Encrypt the password using Sha256 into plaintext
    const password = await hashPassword(payload.password);

    // Create a session
    const session = await useAppSession();

    if (found) {
      if (found.password !== password) {
        return {
          error: true,
          userExists: true,
          message: "User already exists",
        };
      }

      // Store the user's email in the session
      await session.update({
        userEmail: found.email,
      });

      // Redirect to the prev page stored in the "redirect" search param
      throw redirect({
        href: payload.redirectUrl || "/",
      });
    }

    // Create the user
    const user = await db
      .insertInto("users")
      .values({
        email: payload.email,
        password,
      })
      .returningAll()
      .executeTakeFirst();

    if (!user) {
      return {
        error: true,
        message: "Failed to create user",
      };
    }

    // Store the user's email in the session
    await session.update({
      userEmail: user.email,
    });

    // Redirect to the prev page stored in the "redirect" search param
    throw redirect({
      href: payload.redirectUrl || "/",
    });
  }
);

export function Signup() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  });

  return (
    <Auth
      actionText="Sign Up"
      status={signupMutation.status}
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement);

        signupMutation.mutate({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        });
      }}
      afterSubmit={
        signupMutation.data?.error ? (
          <>
            <div className="text-red-400">{signupMutation.data.message}</div>
          </>
        ) : null
      }
    />
  );
}
