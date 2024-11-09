"use server";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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
    `${ENDPOINT.GET_PAGE_TIN_TUC}?${searchParams}`
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
  function convertToDateDDMMYYYY(isoDateString) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

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
  const mainPosts = [
    {
      id: 1,
      title:
        "Kangnam khai trương bệnh viện thẩm mỹ Kangnam Quận 5 khẳng định vị thế dẫn đầu",
      date: "28/10/2024",
      author: "Lily Kim Giang",
      description:
        "Sáng ngày 26/10/2024, sự kiện khai trương Bệnh viện Thẩm mỹ Kangnam Quận 5 diễn ra thành công, thu hút sự quan tâm của đông đảo khách hàng và giới chuyên môn...",
      img: "/dich-vu/khai-truong-kangnam-quan-thurm-300x169.jpg",
    },
    {
      id: 2,
      title:
        "Đội ngũ bác sĩ bệnh viện Thẩm mỹ Kangnam tham dự Hội nghị Khoa học Quốc tế thường niên HPASS 2024",
      date: "17/10/2024",
      author: "BTV Bệnh Viện Thẩm Mỹ Kangnam",
      description:
        "Ngày 12-13 tháng 10 năm 2024, các bác sĩ của Bệnh viện Thẩm mỹ Kangnam đã tham dự Hội nghị Khoa học Quốc tế HPASS lần thứ 8...",
      img: "/dich-vu/khai-truong-kangnam-quan-thurm-300x169.jpg",
    },
    {
      id: 3,
      title:
        "Dr. Richard Huy và đội ngũ bác sĩ BVTM Kangnam tham dự Hội nghị PARS 2024",
      date: "19/09/2024",
      author: "BTV Bệnh Viện Thẩm Mỹ Kangnam",
      description:
        "Ngày 14 – 15 tháng 9 năm 2024, Dr. Richard Huy cùng đội ngũ bác sĩ BVTM Kangnam đã tham gia Hội nghị Khoa học Quốc tế PARS 2024...",
      img: "/dich-vu/khai-truong-kangnam-quan-thurm-300x169.jpg",
    },
  ];
  const baiVietData = await fetchData(
    `${ENDPOINT.GET_TIN_TUC}?${searchParams}`
  );
  const baiViet = baiVietData.data;
  const baiVietLienQuanData = await fetchData(
    `${ENDPOINT.GET_TIN_TUC}?${searchParams}&pagination[pageSize]=10	`
  );
  const baiVietLienQuan = baiVietLienQuanData.data;

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <div className="space-y-8">
              {baiViet.map((post) => {
                const imageUrl =
                  post?.attributes?.seo?.thumbnail?.data?.attributes?.url;

                return (
                  <Link key={post.id} href={post?.attributes?.slug}>
                    <div className="flex flex-col md:flex-row md:space-x-4 border-b pb-4 mb-4">
                      <div className="md:w-1/3 flex-shrink-0">
                        <Image
                          src={
                            imageUrl
                              ? `${process.env.NEXT_PUBLIC_URL_BE}${imageUrl}`
                              : "/path/defalut.jpg"
                          }
                          alt={post?.attributes?.title}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-full"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                          {post?.attributes?.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-1">
                          Cập nhật:{" "}
                          {convertToDateDDMMYYYY(post?.attributes?.createdAt)} -
                          Tác giả: admin
                        </p>
                        <p className="text-gray-700 text-sm line-clamp-5">
                          {post?.attributes?.seo?.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="w-full bg-white md:rounded-lg md:shadow-lg md:p-4">
              <h2 className="text-lg font-bold text-white bg-[#0c4077] px-4 py-2 rounded-t-lg">
                Bài viết liên quan
              </h2>
              <div className="divide-y overflow-y-auto max-full w:max-h-96">
                {baiVietLienQuan.map((post) => {
                  const imageUrl =
                    post?.attributes?.seo?.thumbnail?.data?.attributes?.url;
                  return (
                    <Link key={post.id} href={post?.attributes?.slug}>
                      {" "}
                      <div className="flex items-start py-4 space-x-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          <Image
                            src={
                              imageUrl
                                ? `${process.env.NEXT_PUBLIC_URL_BE}${imageUrl}`
                                : "/path/defalut.jpg"
                            }
                            alt={post?.attributes?.title}
                            width={64}
                            height={64}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-blue-900 mb-1">
                            {post?.attributes?.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {post.category}
                          </p>
                          <p className="text-xs text-gray-400">
                            Cập nhật ngày{" "}
                            {convertToDateDDMMYYYY(post?.attributes?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
