function Select({
  placeholder,
  options,
}: {
  placeholder: string;
  options: string[];
}) {
  return (
    <select>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

export default Select;
