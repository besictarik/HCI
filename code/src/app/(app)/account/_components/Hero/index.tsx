import { getCurrentCustomer } from "@/lib/auth/getCurrentCustomer";

const Hero = async () => {
  const customer = await getCurrentCustomer();
  const name = customer?.name?.trim() || customer?.email || "student";

  return (
    <section className="py-8 md:py-12 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {customer ? `Hey ${name}, ready to learn?` : "Hey stranger, got lost?"}
        </h1>
        <p className="text-muted-foreground">
          {customer
            ? "Your purchased courses are waiting below."
            : "Please log in first to access your account and courses."}
        </p>
      </div>
    </section>
  );
};

export default Hero;
