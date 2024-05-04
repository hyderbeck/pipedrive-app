function TextInput({
  placeholder,
  children,
  type,
  name,
}: {
  placeholder: string;
  children?: React.ReactNode;
  type: string;
  name: string;
}) {
  const textInput = <input type={type} placeholder={placeholder} name={name} />;
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
