import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex items-center justify-center min-h-40">
      <h3>Welcome to Invite Manager</h3>
    </div>
  );
}
