import React from "react";
import { ComboBox, ComboBoxItem } from "./react-aria/ComboBox";
import { Button, Form } from "react-aria-components";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { UserUI } from "~/kysely/kysely.types";

interface IFormInput {
  userId: number | null;
}

const UsersSchema: ZodType<IFormInput> = z.object({
  userId: z.nullable(z.number({ required_error: "Select a user" })),
});

type UserComboboxProps = {
  users: UserUI[];
  isLoading: boolean;
  onInvite: (userId: number) => void;
};

const UsersCombobox: React.FC<UserComboboxProps> = ({
  users,
  isLoading,
  onInvite,
}) => {
  const { handleSubmit, control } = useForm<IFormInput>({
    resolver: zodResolver(UsersSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => onInvite(data.userId!);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Invite user form"
      className="flex flex-row gap-4 pb-4 items-start">
      <Controller
        control={control}
        name="userId"
        render={({
          field: { name, onChange, onBlur },
          fieldState: { error, invalid },
        }) => (
          <ComboBox
            name={name}
            label="Users"
            className="flex w-1/5 "
            isInvalid={invalid}
            items={users?.map(({ email, id }) => ({
              label: email,
              value: id,
            }))}
            errorMessage={error?.message}
            onSelectionChange={onChange}
            onBlur={onBlur}
            isDisabled={isLoading}>
            {({ label, value }) => (
              <ComboBoxItem aria-label={label} key={value} id={value}>
                {label}
              </ComboBoxItem>
            )}
          </ComboBox>
        )}
      />
      <Button
        type="submit"
        aria-label="Invite"
        className="h-9 mt-6 py-1 px-2 bg-cyan-600 text-white rounded font-black uppercase ">
        invite
      </Button>
    </Form>
  );
};

export default UsersCombobox;
