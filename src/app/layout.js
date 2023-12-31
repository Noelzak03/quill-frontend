import { Inter } from "next/font/google";
import "src/app/globals.css";
import Navbar from "./components/Navbar";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quill",
  description: "Generated by create next app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-secondary">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
