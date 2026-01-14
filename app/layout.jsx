import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Contact from "../components/layouts/Contact";
import NextTopLoader from "nextjs-toploader";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Phòng Khám Thẩm Mỹ Trần Điền",
  description:
    "Phòng Khám Thẩm Mỹ Trần Điền - Địa chỉ làm đẹp uy tín, chuyên nghiệp với đội ngũ bác sĩ tận tâm.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManager gtmId="GTM-NF2C32J8" />
        <GoogleAnalytics gaId="G-W3L8JF4CKK" />
        <Header />
        <Contact />
        <AntdRegistry>
          <NextTopLoader
            color="#29a745"
            initialPosition={0.08}
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />{" "}
          {children}
        </AntdRegistry>
        <Footer />
      </body>
    </html>
  );
}
