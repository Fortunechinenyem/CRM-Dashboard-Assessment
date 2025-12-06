import type { Metadata } from "next";
import { poppins } from "@/lib/fonts";
import "../styles/globals.css";

import { AuthProvider } from "@/store/auth-context";
import { ToastProvider } from "@/components/ui/Toast/Toast";

export const metadata: Metadata = {
  title: "CRM Dashboard",
  description: "Customer Relationship Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans bg-[#FAFBFF] antialiased">
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
