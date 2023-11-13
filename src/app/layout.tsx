import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { inter } from "@/fonts/index";
import "./globals.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export const metadata: Metadata = { title: "Desafio para Dev Pleno - Ambisis" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
