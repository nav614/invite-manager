// app/services/session.server.ts
import { useSession } from "vinxi/http";
import { User } from "../kysely/kysely.types";

type SessionUser = {
  userEmail: User["email"];
};

export function useAppSession() {
  return useSession<SessionUser>({
    password: "ChangeThisBeforeShippingToProdOrYouWillBeFired",
  });
}
