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
import UsersCombobox from "~/components/UsersCombobox";
import { useUsers } from "~/hooks/useUsers";
import useNewInvite from "~/hooks/useNewInvite";
import { Permissions } from "~/components/Permissions";

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
  const {
    onInviteUser,
    initialPermissions,
    newInvitee,
    onDeveleNewInvite,
    onPermissionsChanged,
    onSaveNewInvite,
  } = useNewInvite(users);
  const invitesGiven: InviteUI[] = [];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <UsersCombobox
        users={users}
        isLoading={userIsLoading}
        onInvite={onInviteUser}
      />
      <Table aria-label="Invites Given" className="w-full">
        <TableHeader>
          <Column className="font-bold text-gray-700 text-left" isRowHeader>
            Invitee
          </Column>
          <Column className="font-bold text-gray-700 text-left">
            Permissions
          </Column>
          <Column className="font-bold text-gray-700 text-left">Date</Column>
          <Column className="font-bold text-gray-700 text-left">Status</Column>
          <Column className="font-bold text-gray-700">Actions</Column>
        </TableHeader>
        <TableBody>
          {newInvitee ? (
            <Row key="-1">
              <Cell className="p-2 text-gray-900 ">{newInvitee.email}</Cell>
              <Cell className="p-2 text-gray-600 ">
                <Permissions
                  initialPermissions={initialPermissions}
                  onPermissionsChange={onPermissionsChanged}
                />
              </Cell>
              <Cell className="p-2 text-gray-600" />
              <Cell className="p-2 text-gray-600" />
              <Cell className="p-2 ">
                <div className="flex justify-center items-center gap-4 ">
                  <Button
                    aria-label={`Delete invite to ${newInvitee.email}`}
                    onPress={onDeveleNewInvite}
                    className="text-red-600 hover:text-red-800">
                    Delete
                  </Button>
                  <Button
                    aria-label={`Save invite to ${newInvitee.email}`}
                    onPress={onSaveNewInvite}
                    className="text-gray-600 hover:text-gray-800">
                    Save
                  </Button>
                </div>
              </Cell>
            </Row>
          ) : null}
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
