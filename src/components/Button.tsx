function Button({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
