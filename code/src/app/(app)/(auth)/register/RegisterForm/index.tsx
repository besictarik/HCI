"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Form } from "@/ui/form";
import RedirectPathResolver from "../../_components/RedirectPathResolver";
import { parseApiError, withRedirectParam } from "./helpers";
import { registerSchema, type RegisterSchema } from "./schema";

const RegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState("/");
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const handleSubmit = async (values: RegisterSchema) => {
    setServerError(null);

    try {
      const createResponse = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      if (!createResponse.ok) {
        const message = await parseApiError(createResponse, "Sign-up failed");
        setServerError(message);
        return;
      }

      const loginResponse = await fetch("/api/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!loginResponse.ok) {
        setServerError("Account created. Please sign in.");
        router.push(withRedirectParam("/login", redirectPath));
        router.refresh();
        return;
      }

      router.push(redirectPath);
      router.refresh();
    } catch {
      setServerError("Sign-up failed");
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <RedirectPathResolver onResolve={setRedirectPath} />
      </Suspense>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <Label
                    htmlFor="name"
                    className={fieldState.error ? "text-destructive" : undefined}
                  >
                    Full Name
                  </Label>
                  <span
                    className={`min-w-24 text-right text-xs text-destructive ${
                      fieldState.error?.message ? "visible" : "invisible"
                    }`}
                  >
                    {fieldState.error?.message ?? "Error"}
                  </span>
                </div>
                <Input
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  aria-invalid={Boolean(fieldState.error)}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <Label
                    htmlFor="email"
                    className={fieldState.error ? "text-destructive" : undefined}
                  >
                    Email Address
                  </Label>
                  <span
                    className={`min-w-24 text-right text-xs text-destructive ${
                      fieldState.error?.message ? "visible" : "invisible"
                    }`}
                  >
                    {fieldState.error?.message ?? "Error"}
                  </span>
                </div>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  aria-invalid={Boolean(fieldState.error)}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <Label
                    htmlFor="password"
                    className={fieldState.error ? "text-destructive" : undefined}
                  >
                    Password
                  </Label>
                  <span
                    className={`min-w-24 text-right text-xs text-destructive ${
                      fieldState.error?.message ? "visible" : "invisible"
                    }`}
                  >
                    {fieldState.error?.message ?? "Error"}
                  </span>
                </div>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  aria-invalid={Boolean(fieldState.error)}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="terms"
            render={({ field, fieldState }) => (
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <Label
                    htmlFor="terms"
                    className={fieldState.error ? "text-destructive" : undefined}
                  >
                    Terms
                  </Label>
                  <span
                    className={`min-w-24 text-right text-xs text-destructive ${
                      fieldState.error?.message ? "visible" : "invisible"
                    }`}
                  >
                    {fieldState.error?.message ?? "Error"}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={Boolean(field.value)}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    aria-invalid={Boolean(fieldState.error)}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="terms"
                    className={`text-sm leading-normal ${
                      fieldState.error ? "text-destructive" : ""
                    }`}
                  >
                    I agree to the{" "}
                    <Link href="/" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
            )}
          />

          {serverError ? (
            <p className="text-sm text-destructive" role="alert">
              {serverError}
            </p>
          ) : null}

          <Button
            className="w-full"
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link
          href={withRedirectParam("/login", redirectPath)}
          className="text-primary hover:underline font-medium"
        >
          Sign in
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
