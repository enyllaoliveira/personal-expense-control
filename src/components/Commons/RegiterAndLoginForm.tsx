import { FormEventHandler, ReactNode } from "react";

interface RegisterAndLoginFormProps {
  title: string;
  subtitle: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  footerText: string;
  footerLink: string;
  footerHref: string;
}
export default function RegisterAndLoginForm({
  title,
  subtitle,
  onSubmit,
  children,
  footerText,
  footerLink,
  footerHref,
}: RegisterAndLoginFormProps) {
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col mx-auto text-primary-gray-900 gap-4">
      <div className="gap-1 flex flex-col">
        <h1 className="text-lg font-extrabold">{title}</h1>
        <h2 className="text-base font-medium">{subtitle}</h2>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xl flex flex-col px-2 gap-4 font-semibold"
      >
        {children}
        <p>
          {footerText}
          <a href={footerHref} className="underline">
            {footerLink}
          </a>
        </p>
      </form>
    </div>
  );
}
