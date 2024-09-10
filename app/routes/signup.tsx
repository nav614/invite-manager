import { createFileRoute, redirect } from "@tanstack/react-router";
import { Auth } from "~/components/Auth";
import { createServerFn, useServerFn } from "@tanstack/start";
import { hashPassword } from "~/utils/hash";
import { useAppSession } from "~/utils/session";
import { db } from "~/kysely/db";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/signup")({
  component: SignupComponent,
});

export const signupFn = createServerFn(
  "POST",
  async (payload: {
    email: string;
    password: string;
    redirectUrl?: string;
  }) => {
    const found = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", payload.email)
      .executeTakeFirst();

    const password = await hashPassword(payload.password);

    const session = await useAppSession();

    if (found) {
      if (found.password !== password) {
        return {
          error: true,
          userExists: true,
          message: "User already exists",
        };
      }

      await session.update({
        userEmail: found.email,
      });

      throw redirect({
        href: payload.redirectUrl || "/",
      });
    }

    const user = await db
      .insertInto("users")
      .values({
        email: payload.email,
        password,
        is_verified: false,
      })
      .returningAll()
      .executeTakeFirst();

    if (!user) {
      return {
        error: true,
        message: "Failed to create user",
      };
    }

    await session.update({
      userEmail: user.email,
    });

    throw redirect({
      href: payload.redirectUrl || "/",
    });
  }
);

function SignupComponent() {
  const signupMutation = useMutation({
    mutationFn: useServerFn(signupFn),
  });

  const message = signupMutation.data?.error ? signupMutation.data.message : "";

  return (
    <Auth
      actionText="Sign Up"
      status={signupMutation.status}
      onSubmit={(data) => signupMutation.mutate(data)}
      afterSubmitText={message}
    />
  );
}
