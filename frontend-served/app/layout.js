import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Servd - AI Reciepe app",
  description: "AI - powered recipe platform for developers",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="py-8 px-4 border-t">
            <div className="max-w-6xl mx-auto fles justify-center items-center">
              <p className="text-stone-500 text-sm">Made with love by deep</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
