"use server";
import React from "react";
import Image from "next/image";
import { ENDPOINT } from "../../enums/endpoint.enum";
import { apiService } from "../../services/api.service";

const searchData = {
  populate: ["seo.thumbnail"].toString(),
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
  const dataHome = await fetchData(
    `${ENDPOINT.GET_VE_CHUNG_TOI}?${searchParams}`
  );

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
  const dataHome = await fetchData(
    `${ENDPOINT.GET_VE_CHUNG_TOI}?${searchParams}`
  );
  const content = dataHome?.data?.attributes?.content || "";
  const posts = [
    {
      id: 1,
      title: "Bệnh viện JW tung ưu đãi cực lớn chúc mừng Giáng sinh 2024",
      category: "Tin tức thẩm mỹ",
      date: "02/11/2024",
      img: "/tin-tuc.jpg", // Thay thế đường dẫn ảnh tương ứng
    },
    {
      id: 2,
      title: "Những cách chăm sóc mũi sau khi phẫu thuật thế nào?",
      category: "Tin tức thẩm mỹ",
      date: "31/10/2024",
      img: "/tin-tuc.jpg", // Thay thế đường dẫn ảnh tương ứng
    },
    {
      id: 3,
      title: "Nâng mũi nam có nên hay không? Chi phí bao nhiêu?",
      category: "Nâng mũi",
      date: "30/10/2024",
      img: "/tin-tuc.jpg", // Thay thế đường dẫn ảnh tương ứng
    },
    {
      id: 4,
      title: "Chỉ cần nâng mũi nhẹ nhàng",
      category: "Nâng mũi",
      date: "30/10/2024",
      img: "/tin-tuc.jpg", // Thay thế đường dẫn ảnh tương ứng
    },
  ];
  return (
    <>
      <div className=" container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="w-full bg-white md:rounded-lg md:shadow-lg md:p-4">
              <h2 className="text-lg font-bold text-white bg-[#0c4077] px-4 py-2 rounded-t-lg">
                Bài viết liên quan
              </h2>
              <div className="divide-y overflow-y-auto max-full w:max-h-96">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start py-4 space-x-4"
                  >
                    <div className="w-16 h-16 flex-shrink-0">
                      <Image
                        src={post.img || "/path/defalut.jpg"}
                        alt={post.title}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-blue-900 mb-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500">{post.category}</p>
                      <p className="text-xs text-gray-400">
                        Cập nhật ngày {post.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
