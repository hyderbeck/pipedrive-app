function Button({
  text,
  onClick,
  submit,
}: {
  text: string;
  onClick?: () => void;
  submit?: boolean;
}) {
  return (
    <button type={submit ? "submit" : "button"} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
