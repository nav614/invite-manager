import { createRootRoute, Link } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import {
  Body,
  createServerFn,
  Head,
  Html,
  Meta,
  Scripts,
} from "@tanstack/start";
import * as React from "react";
import { useAppSession } from "../utils/session";
import { DefaultCatchBoundary } from "../components/DefaultCatchBoundary";
import { NotFound } from "../components/NotFound";
import "../styles/app.css";

const fetchUser = createServerFn("GET", async () => {
  const session = await useAppSession();

  if (!session.data.userEmail) {
    return null;
  }

  return {
    email: session.data.userEmail,
  };
});

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "Invite Manager",
    },
  ],
  beforeLoad: async () => {
    const user = await fetchUser();

    return {
      user,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext();

  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <div className="p-2 flex gap-2 text-lg">
          {/* <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}>
            Home
          </Link> */}
          <Link
            to={"/dashboard"}
            activeProps={{
              className: "font-bold",
            }}>
            Dashboard
          </Link>
          <div className="ml-auto">
            {user ? (
              <>
                <span className="mr-2">{user.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
              </div>
            )}
          </div>
        </div>
        <hr />
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
