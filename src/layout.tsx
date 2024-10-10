import { ReactNode } from "react";
import { FiLogIn } from "react-icons/fi";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans overflow-x-hidden scroll-smooth mr-auto pt-6">
        {" "}
        <a href="/registro">
          <FiLogIn />
        </a>
        {children}
      </body>
    </html>
  );
}
