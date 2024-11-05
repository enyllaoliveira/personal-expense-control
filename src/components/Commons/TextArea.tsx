import { ChangeEventHandler } from "react";

interface TextAreaComponentProps {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  className?: string;
}
export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}: TextAreaComponentProps) {
  return (
    <>
      <label htmlFor={name} className="block text-normal font-semibold">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`mt-1 mb-4 block w-full border rounded-md p-2 text-black ${className}`}
      />
    </>
  );
}
