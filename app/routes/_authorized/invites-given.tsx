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
import { Invite } from "~/kysely/kysely.types";

export const Route = createFileRoute("/_authorized/invites-given")({
  component: InvitesGivenComponent,
});

function InvitesGivenComponent() {
  const invitesGiven: Invite[] = [];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
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
          {invitesGiven.map((invite) => (
            <Row key={invite.id}>
              <Cell className="p-2 text-gray-900">{invite.invitee_id}</Cell>
              <Cell className="p-2 text-gray-600">
                {invite.permissions.join(", ")}
              </Cell>
              <Cell className="p-2 text-gray-600">
                {invite.invite_date.toISOString()}
              </Cell>
              <Cell className="p-2 text-gray-600">Status</Cell>
              <Cell className="p-2">
                <Button
                  aria-label={`Delete invite to ${invite.invitee_id}`}
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
