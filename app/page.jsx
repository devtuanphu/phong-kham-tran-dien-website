"use server";
import React from "react";
import BannerSlide from "../components/home/BannerSlide";
import About from "../components/home/About";
import BaoGia from "../components/layouts/BaoGia";
import ChuyenGia from "../components/home/ChuyenGia";
import SlideTinTuc from "../components/home/SlideTinTuc";
import SectionChuyenSau from "../components/home/SectionChuyenSau";
import { ENDPOINT } from "../enums/endpoint.enum";
import { apiService } from "../services/api.service";

const searchData = {
  populate: [
    "seo.thumbnail",
    "banner.image",
    "about",
    "slide.image",
    "contentServices.image",
    "doctor.doctors.image",
  ].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

async function fetchData(endpoint) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function fetchWithToken(endpoint) {
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
  console.log(token);

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store", // Đảm bảo không cache dữ liệu
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export async function generateMetadata() {
  console.log(`${ENDPOINT.GET_HOME}?${searchParams}`);
  const dataHome = await fetchWithToken(`${ENDPOINT.GET_HOME}?${searchParams}`);

  const seo =
    (dataHome &&
      dataHome.data &&
      dataHome.data.attributes &&
      dataHome.data.attributes.seo) ||
    {};

  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  return {
    metadataBase: new URL(baseUrl),
    title: seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
    description:
      seo.description ||
      "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
    keywords:
      seo.keywords ||
      "kỹ thuật, công trình, tư vấn cơ điện, xử lý nước, tái sử dụng nước",
    authors: [{ name: seo.author || "Công ty TNHH Kỹ thuật NTS" }],
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.ogDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      url: `${baseUrl}/home`,
      images: [
        {
          url: seo.thumbnail?.data?.attributes?.url
            ? `${baseUrl}${seo.thumbnail.data.attributes.url}`
            : "/path/to/default-image.jpg",
          width: 800,
          height: 600,
          alt: "Image description",
        },
      ],
    },
    twitter: {
      title:
        seo.twitterTitle ||
        seo.title ||
        "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.twitterDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      images: [
        seo.twitterImage
          ? `${baseUrl}${seo.twitterImage}`
          : "/path/to/default-image.jpg",
      ],
      card: "summary_large_image",
    },
  };
}

const Home = async () => {
  const dataHome = await fetchWithToken(`${ENDPOINT.GET_HOME}?${searchParams}`);
  const banner = dataHome?.data?.attributes?.banner || [];
  const about = dataHome?.data?.attributes?.about || "";
  const slide = dataHome?.data?.attributes?.slide;
  const contentServices = dataHome?.data?.attributes?.contentServices || "";
  const doctor = dataHome?.data?.attributes?.doctor || [];
  const baiVietLienQuanData = await fetchWithToken(
    `${ENDPOINT.GET_TIN_TUC}?${searchParams}&pagination[pageSize]=10	`
  );
  const baiVietLienQuan = baiVietLienQuanData.data || [];

  return (
    <>
      <BannerSlide banner={banner} />
      <About about={about} slide={slide} />
      <BaoGia />
      <SectionChuyenSau contentServices={contentServices} />
      <ChuyenGia doctor={doctor} />
      <SlideTinTuc baiVietLienQuan={baiVietLienQuan} />
    </>
  );
};
export default Home;

// "use server";
// import React from "react";
// import BannerSlide from "../components/home/BannerSlide";
// import About from "../components/home/About";
// import BaoGia from "../components/layouts/BaoGia";
// import ChuyenGia from "../components/home/ChuyenGia";
// import SlideTinTuc from "../components/home/SlideTinTuc";
// import SectionChuyenSau from "../components/home/SectionChuyenSau";
// import { ENDPOINT } from "../enums/endpoint.enum";
// import { apiService } from "../services/api.service";

// const searchData = {
//   populate: [
//     "seo.thumbnail",
//     "banner.image",
//     "about",
//     "slide.image",
//     "contentServices.image",
//     "doctor.doctors.image",
//   ].toString(),
// };
// const searchParams = new URLSearchParams(searchData).toString();

// export async function generateMetadata() {
//   const dataHome = await fetch(`${ENDPOINT.GET_HOME}?${searchParams}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
//     },
//     cache: "no-store",
//   }).then((res) => {
//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }
//     return res.json();
//   });
//   const seo =
//     (dataHome &&
//       dataHome.data &&
//       dataHome.data.attributes &&
//       dataHome.data.attributes.seo) ||
//     {};

//   const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

//   return {
//     metadataBase: new URL(baseUrl),
//     title: seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
//     description:
//       seo.description ||
//       "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
//     keywords:
//       seo.keywords ||
//       "kỹ thuật, công trình, tư vấn cơ điện, xử lý nước, tái sử dụng nước",
//     authors: [{ name: seo.author || "Công ty TNHH Kỹ thuật NTS" }],
//     openGraph: {
//       title:
//         seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
//       description:
//         seo.ogDescription ||
//         seo.description ||
//         "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
//       url: `${baseUrl}/home`,
//       images: [
//         {
//           url: seo.thumbnail?.data?.attributes?.url
//             ? `${baseUrl}${seo.thumbnail.data.attributes.url}`
//             : "/path/to/default-image.jpg",
//           width: 800,
//           height: 600,
//           alt: "Image description",
//         },
//       ],
//     },
//     twitter: {
//       title:
//         seo.twitterTitle ||
//         seo.title ||
//         "Trang chủ - Công ty TNHH Kỹ thuật NTS",
//       description:
//         seo.twitterDescription ||
//         seo.description ||
//         "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
//       images: [
//         seo.twitterImage
//           ? `${baseUrl}${seo.twitterImage}`
//           : "/path/to/default-image.jpg",
//       ],
//       card: "summary_large_image",
//     },
//   };
// }

// const Page = async () => {
//   const data = await fetch("http://103.154.63.33:1337/api/home", {
//     cache: "no-store",
//   }).then((res) => res.json());
//   return (
//     <div>
//       <h1>Server-rendered page</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default Page;
