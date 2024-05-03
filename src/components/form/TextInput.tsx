function TextInput({
  placeholder,
  children,
}: {
  placeholder: string;
  children?: React.ReactNode;
}) {
  const textInput = <input type="text" placeholder={placeholder} />;
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
