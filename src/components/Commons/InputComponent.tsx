import { ChangeEventHandler } from "react";

interface InputComponentProps {
  label: string;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export default function InputComponent({
  label,
  type,
  value,
  onChange,
  placeholder = "",
}: InputComponentProps) {
  return (
    <label className="flex flex-col items-start gap-1">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded-md px-2 h-10 border-gray-400 w-full text-primary-gray-800"
      />
    </label>
  );
}
