import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="overflow-x-hidden scroll-smooth mr-auto my-12 sm:my-4">
        {" "}
        <a
          className="bg-slate-400 border text-black items-center justify-center flex flex-row gap-2 w-fit text-sm font-semibold outline-none py-2.5 px-4 rounded-lg transition duration-300 ml-auto hover:bg-slate-300 mb-4 sm:mb-8"
          href="/registro"
        >
          Entrar no sistema
        </a>
        {children}
      </body>
    </html>
  );
}
