import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h3>Welcome to Invite Manager</h3>
    </div>
  );
}
