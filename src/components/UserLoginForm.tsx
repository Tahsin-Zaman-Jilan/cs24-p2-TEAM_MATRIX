"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { ImSpinner8 } from "react-icons/im";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IconInput } from "./ui/icon-input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type UserLoginFormProps = React.HTMLAttributes<HTMLDivElement>;

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email provided"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters")
    .regex(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/), {
      message:
        "Password must contain symbol, must have captalized letter and number",
    }),
});

export default function UserLoginForm({
  className,
  ...props
}: UserLoginFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  type LoginFormSchema = z.infer<typeof loginFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormSchema>({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Invalid Credential Provided");
      }
      if (!response?.error) {
        router.push("/dashboard");
      }
    } catch (error) {
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", { required: true })}
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <IconInput
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              icon={showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              onIconClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password?.message}</p>
            )}
          </div>
          <Button
            disabled={isLoading || !isValid}
            className="text-secondary-foreground"
          >
            {isLoading && (
              <ImSpinner8 className="mr-2 h-4 w-4 animate-spin text-secondary-foreground" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
