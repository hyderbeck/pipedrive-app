function Select({
  placeholder,
  options,
  name,
  required,
}: {
  placeholder: string;
  options: string[];
  name: string;
  required?: boolean;
}) {
  return (
    <select name={name} required={required}>
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
