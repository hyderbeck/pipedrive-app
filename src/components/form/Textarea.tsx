function Textarea({
  placeholder,
  name,
}: {
  placeholder: string;
  name: string;
}) {
  return <textarea placeholder={placeholder} name={name} />;
}

export default Textarea;
