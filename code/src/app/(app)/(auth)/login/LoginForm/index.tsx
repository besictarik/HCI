"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Form } from "@/ui/form";
import RedirectPathResolver from "../../_components/RedirectPathResolver";
import { parseApiError, withRedirectParam } from "./helpers";
import { loginSchema, type LoginSchema } from "./schema";

const LoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState("/");
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginSchema) => {
    setServerError(null);

    try {
      const response = await fetch("/api/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const message = await parseApiError(response, "Sign-in failed");
        setServerError(message);
        return;
      }

      router.push(redirectPath);
      router.refresh();
    } catch {
      setServerError("Sign-in failed");
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
            {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don&#39;t have an account? </span>
        <Link
          href={withRedirectParam("/register", redirectPath)}
          className="text-primary hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
