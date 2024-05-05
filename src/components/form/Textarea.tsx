function Textarea({
  placeholder,
  name,
}: {
  placeholder: string;
  name: string;
}) {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      className="border-2 px-2 py-1 border-neutral-700"
    />
  );
}

export default Textarea;
