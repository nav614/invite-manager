import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { useState } from "react";
import { db } from "~/kysely/db";
import { Permission, UserUI } from "~/kysely/kysely.types";
import { useAppSession } from "~/utils/session";

const postInviteFn = createServerFn(
  "POST",
  async (payload: { invitee_id: number; permissions: Permission[] }) => {
    const session = await useAppSession();
    const userId = session.data.userId;

    if (!userId) {
      return {
        error: true,
        message: "User not found",
      };
    }

    const invite = await db
      .insertInto("invites")
      .values({
        inviter_id: userId,
        invitee_id: payload.invitee_id,
        permissions: payload.permissions,
        is_accepted: false,
        is_pending: true,
      })
      .returningAll()
      .executeTakeFirst();

    return invite;
  }
);

const initialPermissions: Permission[] = [
  "read_posts",
  "read_messages",
  "read_profile",
];

const useNewInvite = (users: UserUI[] = []) => {
  const [newInvitee, setNewInvitee] = useState<UserUI>();
  const [newInvitePermissions, setNewInvitePermissions] =
    useState<Permission[]>(initialPermissions);

  const onInviteUser = (userId: number) => {
    const selectedUser = users?.find((user) => user.id === userId);

    setNewInvitee(selectedUser);
  };

  const onPermissionsChanged = (permissions: Permission[]) => {
    if (!newInvitee) {
      return;
    }
    console.log("onPermissionsChanged", permissions);
    setNewInvitePermissions(permissions);
  };

  const onDeveleNewInvite = () => {
    setNewInvitee(undefined);
  };

  const postInviteMutation = useMutation({
    mutationFn: postInviteFn,
    onSuccess: async (ctx) => {
      setNewInvitee(undefined);
      setNewInvitePermissions([]);
      console.log("Invite sent", ctx);
    },
  });

  const onSaveNewInvite = () => {
    if (!newInvitee) {
      return;
    }
    postInviteMutation.mutate({
      invitee_id: newInvitee.id,
      permissions: newInvitePermissions,
    });
  };

  return {
    newInvitee,
    initialPermissions,
    onInviteUser,
    onPermissionsChanged,
    onDeveleNewInvite,
    onSaveNewInvite,
  };
};

export default useNewInvite;
