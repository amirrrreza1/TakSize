import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header/Header";
import { ToastContainer } from "react-toastify";

export const viewport =
  "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover";

export const metadata = {
  title: "TakStore",
  description: "takstore",
  keywords: ["nextjs", "ecommerce", "store"],
};

const vazirFont = localFont({
  src: [
    {
      path: "../assets/fonts/Vazir-Bold.ttf",
      weight: "800",
      style: "bold",
    },
    {
      path: "../assets/fonts/Vazir-Bold.woff",
      weight: "800",
      style: "bold",
    },
    {
      path: "../assets/fonts/Vazir-Bold.woff2",
      weight: "800",
      style: "bold",
    },
    {
      path: "../assets/fonts/Vazir-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Vazir-Medium.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Vazir-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Vazir-Light.ttf",
      weight: "200",
      style: "light",
    },
    {
      path: "../assets/fonts/Vazir-Light.woff",
      weight: "200",
      style: "light",
    },
    {
      path: "../assets/fonts/Vazir-Light.woff2",
      weight: "200",
      style: "light",
    },
  ],
});

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content={viewport} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <link rel="icon" href="/icons/Logo.svg" />
        <title>{metadata.title}</title>
      </head>
      <body className={vazirFont.className}>
        <Header />
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
