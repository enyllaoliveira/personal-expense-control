import { ChangeEventHandler } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectComponentProps {
  label: string;
  name: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function SelectComponente({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  required = false,
  className = "",
}: SelectComponentProps) {
  return (
    <>
      <label htmlFor={name} className="block text-start font-semibold">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border p-2 mb-4 text-primary-gray-800 rounded-md font-semibold ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
