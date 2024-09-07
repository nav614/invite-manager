import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation } from "~/hooks/useMutation";
import { loginFn } from "./_authorized";
import { Auth } from "~/components/Auth";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const router = useRouter();

  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate();
        router.navigate({ to: "/" });
        return;
      }
    },
  });

  return (
    <Auth
      actionText="Login"
      status={loginMutation.status}
      onSubmit={loginMutation.mutate}
      afterSubmitText={loginMutation.data?.message}
    />
  );
}
