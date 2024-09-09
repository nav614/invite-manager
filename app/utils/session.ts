import { useSession } from "vinxi/http";
import { User } from "../kysely/kysely.types";

type SessionUser = {
  userId: User["id"];
  userEmail: User["email"];
};

export function useAppSession() {
  return useSession<SessionUser>({
    password: "ChangeThisBeforeShippingToProdOrYouWillBeFired",
  });
}
