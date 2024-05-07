import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: "Task app",
  description: "Simple task app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className='w-[80vw] lg:w-[80vw] xl:w-[60vw] mx-auto h-[100vh] mt-10 grid grid-rows-[10%_80%] fixed left-[10vw] lg:left-[10vw] xl:left-[20vw] text-base-content'>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
