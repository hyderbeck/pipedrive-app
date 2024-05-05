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
