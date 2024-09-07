import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormInput {
  email: string;
  password: string;
}

const AuthSchema: ZodType<IFormInput> = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
}: {
  actionText: string;
  onSubmit: SubmitHandler<IFormInput>;
  status: "pending" | "idle" | "success" | "error";
  afterSubmit?: React.ReactNode;
}) {
  const { handleSubmit, control } = useForm<IFormInput>({
    resolver: zodResolver(AuthSchema),
  });

  return (
    <div className="flex items-center justify-center p-8">
      <div className="bg-white  p-8 rounded-lg shadow-lg max-w-xs">
        <h1 className="text-2xl font-bold mb-4">{actionText}</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="email"
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={invalid}>
                <Label>Email</Label>
                <Input
                  className="px-2 py-1 w-full rounded border border-gray-500/20 bg-white "
                  ref={ref}
                />
                <FieldError className="text-xs text-red-500 ">
                  {error?.message}
                </FieldError>
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={invalid}>
                <Label>Password</Label>
                <Input
                  className="px-2 py-1 w-full rounded border border-gray-500/20 bg-white "
                  type="password"
                  ref={ref}
                />
                <FieldError className="text-xs text-red-500 ">
                  {error?.message}
                </FieldError>
              </TextField>
            )}
          />
          <Button
            className="w-full bg-cyan-600 text-white rounded py-2 font-black uppercase"
            type="submit"
            isDisabled={status === "pending"}>
            {status === "pending" ? "..." : actionText}
          </Button>
          {/* <div>
            <label htmlFor="email" className="block text-xs">
              Username
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="px-2 py-1 w-full rounded border border-gray-500/20 bg-white "
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="px-2 py-1 w-full rounded border border-gray-500/20 bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white rounded py-2 font-black uppercase"
            disabled={status === "pending"}>
            {status === "pending" ? "..." : actionText}
          </button> */}
          {afterSubmit ? afterSubmit : null}
        </Form>
      </div>
    </div>
  );
}
