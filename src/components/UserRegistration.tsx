"use client";

import * as React from "react";
import { ImSpinner8 } from "react-icons/im";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type UserRegistrationFormProps = React.HTMLAttributes<HTMLDivElement>;

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { IconInput } from "./ui/icon-input";
import { v4 as uuidV4 } from "uuid";
import { ResponseType } from "@/types/api-response";

const registrationFormSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters.")
      .max(20, { message: "Username can't be greater than 20 characters." }),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one capital letter.",
      })
      .refine((password) => /\d/.test(password), {
        message: "Password must contain at least one number.",
      })
      .refine((password) => /[^A-Za-z0-9]/.test(password), {
        message: "Password must contain at least one symbol.",
      }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function UserRegistrationForm({
  className,
  ...props
}: UserRegistrationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmedPassword, setShowConfirmedPassword] =
    React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegistrationFormSchema>({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: zodResolver(registrationFormSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormSchema> = async (data) => {
    setIsLoading(true);
    const userId = uuidV4();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          id: userId,
          email: data.email,
          name: data.username,
          password: data.password,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const responseData: ResponseType = await res.json();

      if (res.status !== 201) {
        const error =
          responseData?.message ??
          responseData?.error ??
          "An unknown error occured";
        toast.error(error);
      } else {
        toast.success("Account created succesfully");
        router.push("/login");
      }
    } catch (error) {
    } finally {
      reset();
      setIsLoading(false);
      setShowPassword(false);
      setShowConfirmedPassword(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 "
        autoComplete="off"
      >
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="John Doe"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username?.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <div className="grid gap-4">
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
          <div className="grid gap-2">
            <Label htmlFor="password">Re-type Password</Label>
            <IconInput
              id="confirmPassword"
              type={showConfirmedPassword ? "text" : "password"}
              {...register("confirmPassword")}
              icon={
                showConfirmedPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )
              }
              onIconClick={() => {
                setShowConfirmedPassword((prev) => !prev);
              }}
            />

            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button
            disabled={isLoading || !isValid}
            className="text-secondary-foreground"
          >
            {isLoading && <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
