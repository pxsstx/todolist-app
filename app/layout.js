import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todolist App",
  description: "simple todolist app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='w-[80vw] lg:w-[80vw] xl:w-[60vw] mx-auto h-[100vh] mt-10 grid grid-rows-[10%_80%] fixed left-[10vw] lg:left-[10vw] xl:left-[20vw] bg-base-100'>
          <Navbar />
          {children}
        </div>
        
      </body>
    </html>
  );
}
