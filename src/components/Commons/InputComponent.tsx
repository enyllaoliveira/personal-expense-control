import { ChangeEventHandler } from "react";

interface InputComponentProps {
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "date"
    | "checkbox";
  name: string;
  value?: string | number;
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  className?: string;
}

export default function InputComponent({
  label,
  type,
  name,
  value,
  checked,
  onChange,
  placeholder = "",
  required = false,
  min,
  max,
  className = "flex flex-col items-start gap-1 mb-4",
}: InputComponentProps) {
  return (
    <label className={className}>
      {label}
      <input
        type={type}
        name={name}
        value={type === "checkbox" ? undefined : value}
        checked={type === "checkbox" ? checked : undefined}
        onChange={onChange}
        placeholder={type === "checkbox" ? undefined : placeholder}
        required={required}
        min={type === "number" ? min : undefined}
        max={type === "number" ? max : undefined}
        className="border rounded-md px-2 h-10 border-gray-400 w-full text-primary-gray-800"
      />
    </label>
  );
}
