function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}

export default Section;
