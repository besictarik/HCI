import Link from "next/link";
import { Button } from "@/ui/button";

type HeroProps = {
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

const Hero = ({
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: HeroProps) => {
  return (
    <section className="relative min-h-[calc(100vh-65px)] bg-black flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryCtaHref}>
              <Button size="lg" className="w-full sm:w-auto">
                {primaryCtaLabel}
              </Button>
            </Link>
            <Link href={secondaryCtaHref}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white"
              >
                {secondaryCtaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
