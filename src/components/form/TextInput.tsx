function TextInput({
  placeholder,
  children,
  type,
  name,
  required,
}: {
  placeholder: string;
  children?: React.ReactNode;
  type: string;
  name: string;
  required?: boolean;
}) {
  const textInput = (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      required={required}
      className="border-2 min-w-0 px-2 py-1 border-neutral-700"
    />
  );
  return children ? (
    <div>
      {textInput}
      {children}
    </div>
  ) : (
    textInput
  );
}

export default TextInput;
