import LoginForm from "./LoginForm";

const Page = () => {
  return (
    <div className="w-full min-h-[calc(100vh-65px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-border bg-card p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue learning
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
