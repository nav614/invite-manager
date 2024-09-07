import React from "react";
import { useUsers } from "~/hooks/useUsers";
import { ComboBox, ComboBoxItem } from "./react-aria/ComboBox";
import { Button } from "react-aria-components";

const UsersCombobox: React.FC = () => {
  const { data: users, isLoading } = useUsers();

  return (
    <div className="flex gap-4 items-end pb-4">
      <ComboBox
        label="Users"
        items={users?.map(({ email, id }) => ({ label: email, value: id }))}
        className="flex w-1/5"
        isDisabled={isLoading}>
        {({ label, value }) => (
          <ComboBoxItem aria-label={label} key={value} id={value}>
            {label}
          </ComboBoxItem>
        )}
      </ComboBox>
      <Button className="h-9 py-1 px-2 bg-cyan-600 text-white rounded font-black uppercase ">
        invite
      </Button>
    </div>
  );
};

export default UsersCombobox;
