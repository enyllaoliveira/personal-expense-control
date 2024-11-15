import { FormEventHandler, ReactNode } from "react";

interface RegisterAndLoginFormProps {
  title?: string;
  id?: string;
  subtitle?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  footerText?: string;
  footerLink?: string;
  footerHref?: string;
  className?: string;
}
export default function FormComponente({
  title,
  id,
  subtitle,
  onSubmit,
  children,
  footerText,
  footerLink,
  footerHref,
  className,
}: RegisterAndLoginFormProps) {
  return (
    <div
      className={`flex-col mx-auto text-primary-gray-900 gap-4 ${className}`}
    >
      <div className="gap-1 flex flex-col ">
        <h1 className="text-lg font-extrabold">{title}</h1>
        <h2 className="text-base font-medium">{subtitle}</h2>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xl flex flex-col px-2 font-semibold"
        id={id}
      >
        {children}
        <p className="flex gap-1 justify-center mt-2 sm:mt-3 sm:flex-col">
          {footerText}
          <a href={footerHref} className="underline">
            {footerLink}
          </a>
        </p>
      </form>
    </div>
  );
}
