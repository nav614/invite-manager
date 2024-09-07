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

export const Route = createFileRoute("/_authorized/invites-received")({
  component: InvitesReceivedComponent,
});

function InvitesReceivedComponent() {
  const invites: Invite[] = [];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <Table aria-label="Invites Received" className="w-full">
        <TableHeader>
          <Column className="font-bold text-gray-700" isRowHeader>
            Inviter
          </Column>
          <Column className="font-bold text-gray-700">Permissions</Column>
          <Column className="font-bold text-gray-700">Date</Column>
          <Column className="font-bold text-gray-700">Status</Column>
          <Column className="font-bold text-gray-700">Actions</Column>
        </TableHeader>
        <TableBody>
          {invites.map((invite) => (
            <Row key={invite.id}>
              <Cell className="p-2 text-gray-900">{invite.inviter_id}</Cell>
              <Cell className="p-2 text-gray-600">
                {invite.permissions.join(", ")}
              </Cell>
              <Cell className="p-2 text-gray-600">
                {invite.invite_date.toISOString()}
              </Cell>
              <Cell className="p-2 text-gray-600">Status</Cell>
              <Cell className="p-2">
                {invite.is_pending && (
                  <>
                    <Button
                      aria-label={`Accept invite from ${invite.inviter_id}`}
                      onPress={() => {}}
                      className="text-green-600 hover:text-green-800 mr-2">
                      Accept
                    </Button>
                    <Button
                      aria-label={`Reject invite from ${invite.inviter_id}`}
                      onPress={() => {}}
                      className="text-red-600 hover:text-red-800">
                      Reject
                    </Button>
                  </>
                )}
              </Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
