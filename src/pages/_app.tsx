import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { NavBar } from "~/layouts/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable} `}>
      <div className="h-full w-full">
        <NavBar />
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default api.withTRPC(MyApp);
