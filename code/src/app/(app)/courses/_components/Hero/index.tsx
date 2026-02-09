const Hero = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground mb-4">Courses</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Explore Our Courses
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Choose from hundreds of courses across different categories and start
          learning today.
        </p>
      </div>
    </section>
  );
};

export default Hero;
