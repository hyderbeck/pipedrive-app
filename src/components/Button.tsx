function Button({
  text,
  onClick,
  submit,
  className,
}: {
  text: string;
  onClick?: () => void;
  submit?: boolean;
  className?: string;
}) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`border-2 rounded-md w-fit px-2 py-1 border-neutral-700 font-semibold hover:shadow-inner hover:shadow-neutral-300 bg-neutral-50 ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
