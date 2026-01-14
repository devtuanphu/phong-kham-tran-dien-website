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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Phòng Khám Thẩm Mỹ Trần Điền",
              "url": "https://phongkhamthammytrandien.com/",
              "telephone": "+84973171192",
              "image":
                "https://phongkhamthammytrandien.com/_next/image?url=%2Flogo.png&w=640&q=75",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "10 Trần Điền",
                "addressLocality": "Hoàng Mai",
                "addressRegion": "Hà Nội",
                "addressCountry": "VN",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 21.067189673444457,
                "longitude": 105.82125567291729,
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  "opens": "08:00",
                  "closes": "20:00",
                },
              ],
              "sameAs": [
                "https://maps.app.goo.gl/jiU7GGQ6wXpQWBc88",
                "https://www.facebook.com/10trandien",
                "https://www.tiktok.com/@10trandien",
                "https://www.youtube.com/@10trandien",
              ],
            }),
          }}
        />
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
