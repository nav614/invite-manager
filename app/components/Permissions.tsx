import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from "react-aria-components";
import { Switch } from "./react-aria/Switch";
import { Permission } from "~/kysely/kysely.types";

type PermissionsProps = {
  initialPermissions: Permission[];
  onPermissionsChange: (permissions: Permission[]) => void;
};

type PermissionsFormValues = {
  [key in Permission]: boolean;
};

export const Permissions: FC<PermissionsProps> = ({
  onPermissionsChange,
  initialPermissions,
}: PermissionsProps) => {
  const { control, watch } = useForm<PermissionsFormValues>({
    defaultValues: initialPermissions.reduce((acc, permission) => {
      return {
        ...acc,
        [permission]: true,
      };
    }, {} as PermissionsFormValues),
  });

  watch((values) => {
    const derivedPermissions = Object.keys(values).filter(
      (key) => values[key as keyof PermissionsFormValues]
    ) as Permission[];

    onPermissionsChange(derivedPermissions);
  });

  return (
    <Form className="flex flex-col gap-1">
      <Controller
        name="read_posts"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Read posts
          </Switch>
        )}
      />
      <Controller
        name="write_posts"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Write posts
          </Switch>
        )}
      />
      <Controller
        name="read_messages"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Read messages
          </Switch>
        )}
      />
      <Controller
        name="write_messages"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Write messages
          </Switch>
        )}
      />
      <Controller
        name="read_profile"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Read profile info
          </Switch>
        )}
      />
      <Controller
        name="write_profile"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Write profile info
          </Switch>
        )}
      />
    </Form>
  );
};
