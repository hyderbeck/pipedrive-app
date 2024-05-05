function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-2 border-neutral-700 w-72 h-60 flex flex-col py-2 px-4 gap-y-2 rounded-md bg-neutral-50">
      <h2 className="text-lg font-semibold text-center">{heading}</h2>
      {children}
    </section>
  );
}

export default Section;
