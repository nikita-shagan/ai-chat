import { StoreProvider } from "@/app/store";
import "@/app/styles";
import { StyledComponentsRegistry } from "@/app/styles";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ReactNode } from "react";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Ai Chat",
};

export function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${ibmPlexSans.className}`}>
        <StyledComponentsRegistry>
          <StoreProvider>{children}</StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
