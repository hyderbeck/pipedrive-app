function Select({
  placeholder,
  options,
  name,
}: {
  placeholder: string;
  options: string[];
  name: string;
}) {
  return (
    <select name={name}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
