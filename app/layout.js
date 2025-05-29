import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Github, Linkedin } from "lucide-react";
const inter= Inter({subsets: ["latin"]});

export const metadata = {
  title: "FinSight",
  description: "One stop solution for all your financial needs",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}`}>
        {/*header*/}
        <Header></Header>
        <main className="min-h-screen">{children}</main>
        <Toaster richColors/>
        {/*footer*/}
        <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600 space-y-2">
              <p>Made by Anmol Kumar Ojha</p>
              <div className="flex justify-center items-center gap-4">
                <a
                  href="https://github.com/anmolkr7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline hover:text-blue-600 transition"
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/anmol-kumar-ojha-0b270b251/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline hover:text-blue-600 transition"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </body>
    </html>
    </ClerkProvider>
  );
}
