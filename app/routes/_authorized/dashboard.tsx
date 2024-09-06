import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorized/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return <div>Hello /_authorized/dashboard!</div>;
}
