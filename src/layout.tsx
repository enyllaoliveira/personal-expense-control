import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="overflow-x-hidden scroll-smooth mr-auto my-12 sm:my-4 px-4">
        {" "}
        <a
          className="bg-primary-gray-600 border text-black focus:outline focus:outline-4 focus:outline-gray-100 items-center justify-center min-h-10 flex flex-row gap-2 w-fit text-sm font-semibold outline-none py-2.5 px-4 rounded-lg transition duration-300 ml-auto hover:bg-primary-gray-600"
          href="/registro"
        >
          Entrar no sistema
        </a>
        {children}
      </body>
    </html>
  );
}
