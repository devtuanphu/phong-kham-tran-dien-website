"use server";
import React from "react";
import Image from "next/image";

import BaoGia from "../../components/layouts/BaoGia";
import { ENDPOINT } from "../../enums/endpoint.enum";
import { apiService } from "../../services/api.service";
const searchData = {
  populate: [
    "seo.thumbnail",
    "imageServices.image",
    "banner.image",
    "services.image",
    "image.image",
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
export async function generateMetadata() {
  const dataHome = await fetchData(`${ENDPOINT.GET_DICH_VU}?${searchParams}`);

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
const page = async () => {
  const sections = [
    {
      id: 1,
      title: "Xem trước kết quả 3D",
      description:
        "Công nghệ AI - FACE DESIGN cho phép tạo ra các mô phỏng 3D (trước và sau phẫu thuật) chính xác đến 95% sau 5 phút. Từ đó hỗ trợ các bác sĩ phân tích, tính toán các thông số, tùy chỉnh kích thước mí... để phù hợp nhất với gương mặt và mong muốn của khách hàng.",
      img: "/dich-vu/page3-1.jpg",
    },
    {
      id: 2,
      title: "Dịch vụ trẻ hóa mắt",
      description:
        "Giải pháp trẻ hóa mắt toàn diện giúp xóa bỏ nếp nhăn, quầng thâm, mang lại vẻ tươi trẻ cho đôi mắt, giúp bạn tự tin và cuốn hút.",
      img: "/dich-vu/page3-1.jpg",
    },
    // Thêm các phần tử khác nếu cần
  ];

  const dataHome = await fetchData(`${ENDPOINT.GET_DICH_VU}?${searchParams}`);
  const image =
    dataHome?.data?.attributes?.image?.image?.data?.attributes?.url || "";
  const services_2 = dataHome?.data?.attributes?.imageServices;
  const banner =
    dataHome?.data?.attributes?.banner?.image?.data?.attributes?.url || "";
  const services = dataHome?.data?.attributes?.services;

  return (
    <>
      {" "}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-4">
          {dataHome?.data?.attributes?.title}
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          {dataHome?.data?.attributes?.description}
        </p>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Static Image */}
          <div className="w-full">
            <Image
              src={process.env.NEXT_PUBLIC_URL_BE + image} // Thay thế bằng đường dẫn ảnh tĩnh của bạn
              alt="Thẩm mỹ mắt"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services_2.map((service) => {
              const imageUrl = service.image.data.attributes.url;
              return (
                <div
                  key={service.id}
                  className="bg-blue-100 rounded-lg p-4 text-center shadow-md"
                >
                  <Image
                    src={process.env.NEXT_PUBLIC_URL_BE + imageUrl}
                    alt={service.title}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover w-full h-48 mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <BaoGia />
      <div>
        <Image
          src={process.env.NEXT_PUBLIC_URL_BE + banner}
          alt="banner dịch vụ"
          layout="responsive" // Điều chỉnh kích thước ảnh tự động theo màn hình
          width={1600} // Đặt kích thước thực tế của ảnh
          height={400} // Đặt kích thước thực tế của ảnh
          className="w-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {" "}
        <div className="space-y-16">
          {services.map((section, index) => {
            const imageUrl = section.image.data.attributes.url;
            return (
              <div
                key={section.id}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Text Content */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {section.title}
                  </h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2">
                  <Image
                    src={process.env.NEXT_PUBLIC_URL_BE + imageUrl}
                    alt={section.title}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
