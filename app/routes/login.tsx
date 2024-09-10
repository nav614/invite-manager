import { createFileRoute, useRouter } from "@tanstack/react-router";
import { loginFn } from "./_authorized";
import { Auth } from "~/components/Auth";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx?.error) {
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
      onSubmit={(data) => loginMutation.mutate(data)}
      afterSubmitText={loginMutation.data?.message}
    />
  );
}
