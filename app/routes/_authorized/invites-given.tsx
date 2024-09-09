import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  Button,
} from "react-aria-components";
import { createFileRoute } from "@tanstack/react-router";
import { UserUI } from "~/kysely/kysely.types";
import UsersCombobox from "~/components/UsersCombobox";
import { useUsers } from "~/hooks/useUsers";
import { useState } from "react";

export const Route = createFileRoute("/_authorized/invites-given")({
  component: InvitesGivenComponent,
});

interface InviteUI {
  id: number;
  invitee_email: string;
  permissions: string[];
  invite_date: Date;
  is_pending: boolean;
  is_accepted: boolean;
}

function InvitesGivenComponent() {
  const { data: users, isLoading: userIsLoading } = useUsers();
  const [newInviteUser, setNewInviteUser] = useState<UserUI>();
  const invitesGiven: InviteUI[] = [];

  const handleInvite = (userId: number) => {
    const selectedUser = users?.find((user) => user.id === userId);
    if (!selectedUser) {
      return;
    }
    setNewInviteUser(selectedUser);
    console.log("invitesGiven", invitesGiven);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <UsersCombobox
        users={users ? users : []}
        isLoading={userIsLoading}
        onInvite={handleInvite}
      />
      <Table aria-label="Invites Given" className="w-full">
        <TableHeader>
          <Column className="font-bold text-gray-700" isRowHeader>
            Invitee
          </Column>
          <Column className="font-bold text-gray-700">Permissions</Column>
          <Column className="font-bold text-gray-700">Date</Column>
          <Column className="font-bold text-gray-700">Status</Column>
          <Column className="font-bold text-gray-700">Actions</Column>
        </TableHeader>
        <TableBody>
          {newInviteUser && (
            <Row key="-1">
              <Cell className="p-2 text-gray-900">{newInviteUser.email}</Cell>
              <Cell className="p-2 text-gray-600" />
              <Cell className="p-2 text-gray-600" />
              <Cell className="p-2 text-gray-600" />
              <Cell className="p-2 flex justify-center">
                <Button
                  aria-label={`Delete invite to ${newInviteUser.email}`}
                  onPress={() => {}}
                  className=" text-red-600 hover:text-red-800">
                  Delete
                </Button>
              </Cell>
            </Row>
          )}
          {invitesGiven.map((invite) => (
            <Row key={invite.id}>
              <Cell className="p-2 text-gray-900">{invite.invitee_email}</Cell>
              <Cell className="p-2 text-gray-600">
                {invite.permissions.join(", ")}
              </Cell>
              <Cell className="p-2 text-gray-600">
                {invite.invite_date.toISOString()}
              </Cell>
              <Cell className="p-2 text-gray-600">Status</Cell>
              <Cell className="p-2">
                <Button
                  aria-label={`Delete invite to ${invite.invitee_email}`}
                  onPress={() => {}}
                  className="text-red-600 hover:text-red-800">
                  Delete
                </Button>
              </Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
