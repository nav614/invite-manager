import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from "react-aria-components";
import { Switch } from "./react-aria/Switch";

type PermissionsProps = {
  onPermissionsChange: (permissions: string[]) => void;
};

type PermissionsFormValues = {
  readPosts: boolean;
  writePosts: boolean;
  readMessages: boolean;
  writeMessages: boolean;
  readProfileInfo: boolean;
  writeProfileInfo: boolean;
};

export const Permissions: FC<PermissionsProps> = (props: PermissionsProps) => {
  const { control, watch } = useForm<PermissionsFormValues>({
    defaultValues: {
      readPosts: true,
      writePosts: false,
      readMessages: true,
      writeMessages: false,
      readProfileInfo: true,
      writeProfileInfo: false,
    },
  });

  const watchedValues = watch();

  const derivedPermissions = Object.keys(watchedValues).filter(
    (key) => watchedValues[key as keyof PermissionsFormValues]
  );

  props.onPermissionsChange(derivedPermissions);

  return (
    <Form className="flex flex-col gap-1">
      <Controller
        name="readPosts"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Read posts
          </Switch>
        )}
      />
      <Controller
        name="writePosts"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Write posts
          </Switch>
        )}
      />
      <Controller
        name="readMessages"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Read messages
          </Switch>
        )}
      />
      <Controller
        name="writeMessages"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Write messages
          </Switch>
        )}
      />
      <Controller
        name="readProfileInfo"
        control={control}
        render={({ field }) => (
          <Switch isSelected={field.value} onChange={field.onChange}>
            Read profile info
          </Switch>
        )}
      />
      <Controller
        name="writeProfileInfo"
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
