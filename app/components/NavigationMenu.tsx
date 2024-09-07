import { Link } from "@tanstack/react-router";

function NavigationMenu({ user }: { user: { email: string } | null }) {
  return (
    <div className="p-2 flex gap-2 text-lg border-b">
      {user ? (
        <div className="flex gap-2">
          <Link
            to={"/invites-given"}
            activeProps={{
              className: "font-bold",
            }}>
            Invites given
          </Link>
          <Link
            to={"/invites-received"}
            activeProps={{
              className: "font-bold",
            }}>
            Invites received
          </Link>
        </div>
      ) : null}
      <div className="ml-auto">
        {user ? (
          <div className="flex items-center">
            <span className="mr-4 text-xs">{user.email}</span>
            <Link to="/logout">Logout</Link>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavigationMenu;
