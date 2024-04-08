import "./globals.css";

import { Inter } from "next/font/google";
import { ProgramOutputProvider } from '@/contexts/ProgramOutputContext';
import { ViewManagerProvider } from '@/contexts/ViewManagerContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simple Interpreter For C-Like Language",
  description: "This interpreter handles a highly simplified version of C-like syntax, showing the steps of an interpreter for educational purposes, beginners, or anyone seeking to grasp basic programming concepts without the overhead of more complex languages. Its simplicity ensures that it is easy to understand and modify, and it is also easy to extend to handle more complex syntax.",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <ProgramOutputProvider>
        <ViewManagerProvider>
          <body className={inter.className}>{children}</body>
        </ViewManagerProvider>
      </ProgramOutputProvider>
    </html>
  );
}
