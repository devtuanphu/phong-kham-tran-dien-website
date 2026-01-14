"use server";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ENDPOINT } from "../../enums/endpoint.enum";
import { apiService } from "../../services/api.service";
const searchData = {
  populate: ["seo.thumbnail"].toString(),
  sort: "createdAt:desc",
};
const searchParams = new URLSearchParams(searchData).toString();

async function fetchWithToken(endpoint) {
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;

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

export async function generateMetadata({ params }) {
  const { slug } = params;

  const dataHome = await fetchWithToken(
    `${ENDPOINT.GET_TIN_TUC}?filters[slug][$eq]=${slug}&${searchParams}`
  );

  const seo = dataHome?.data[0].attributes?.seo;

  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  return {
    metadataBase: new URL(baseUrl),
    title: seo.title || "Phòng Khám Thẩm Mỹ Trần Điền",
    description:
      seo.description ||
      "Phòng Khám Thẩm Mỹ Trần Điền - Địa chỉ làm đẹp uy tín, chuyên nghiệp với đội ngũ bác sĩ tận tâm.",
    keywords:
      seo.keywords ||
      "thẩm mỹ, làm đẹp, phòng khám trần điền, chăm sóc da, phẫu thuật thẩm mỹ",
    authors: [{ name: seo.author || "Phòng Khám Thẩm Mỹ Trần Điền" }],
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Phòng Khám Thẩm Mỹ Trần Điền",
      description:
        seo.ogDescription ||
        seo.description ||
        "Phòng Khám Thẩm Mỹ Trần Điền - Địa chỉ làm đẹp uy tín, chuyên nghiệp với đội ngũ bác sĩ tận tâm.",
      url: `https://phongkhamthammytrandien.com/${slug}`,
      images: [
        {
          url: seo.thumbnail?.data?.attributes?.url
            ? `${baseUrl}${seo.thumbnail.data.attributes.url}`
            : "/path/to/default-image.jpg",
          width: 800,
          height: 600,
          alt: seo.title || "Phòng Khám Thẩm Mỹ Trần Điền",
        },
      ],
    },
    twitter: {
      title:
        seo.twitterTitle ||
        seo.title ||
        "Phòng Khám Thẩm Mỹ Trần Điền",
      description:
        seo.twitterDescription ||
        seo.description ||
        "Phòng Khám Thẩm Mỹ Trần Điền - Địa chỉ làm đẹp uy tín, chuyên nghiệp với đội ngũ bác sĩ tận tâm.",
      images: [
        seo.twitterImage
          ? `${baseUrl}${seo.twitterImage}`
          : "/path/to/default-image.jpg",
      ],
      card: "summary_large_image",
    },
  };
}
const page = async ({ params }) => {
  const { slug } = params;
  function convertToDateDDMMYYYY(isoDateString) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const baiVietLienQuanData = await fetchWithToken(
    `${ENDPOINT.GET_TIN_TUC}?${searchParams}&pagination[pageSize]=10`
  );
  const baiVietLienQuan = baiVietLienQuanData.data || {};
  const detailPost = await fetchWithToken(
    `${ENDPOINT.GET_TIN_TUC}?filters[slug][$eq]=${slug}&${searchParams}`
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-8xl">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <div
              className="overflow-x-hidden rich-text-content"
              dangerouslySetInnerHTML={{
                __html: detailPost?.data[0]?.attributes?.content || "",
              }}
            ></div>
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
                                : "/path/default.jpg"
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
