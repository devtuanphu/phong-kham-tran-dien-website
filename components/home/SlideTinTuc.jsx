"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const SlideTinTuc = ({ baiVietLienQuan }) => {
  const slides = [
    {
      id: 1,
      title:
        "Bác sĩ Tú Dung chuyên sửa “lỗi tạo hóa” với 1000 ca phẫu thuật thẩm mỹ...",
      description:
        "Trước khi nhiều thành tựu về tạo hình thẩm mỹ, ít ai ngờ Bác sĩ Tú Dung – Tổng Giám đốc Bệnh viện JW...",
      img: "/home/bac-si-tu-dung-350x183.png",
    },
    {
      id: 2,
      title: "Ca phẫu thuật thẩm mỹ đặc biệt...",
      description:
        "Đây là một ca phẫu thuật đặc biệt được thực hiện bởi bác sĩ Tú Dung...",
      img: "/home/bac-si-tu-dung-350x183.png",
    },
    {
      id: 3,
      title: "1000 ca phẫu thuật thành công...",
      description: "Đã đạt được con số ấn tượng với 1000 ca thành công...",
      img: "/home/bac-si-tu-dung-350x183.png",
    },
    // Thêm các mục khác nếu cần
  ];

  return (
    <div className="w-full p-5 bg-[#f5fafd] rounded-lg shadow-md">
      <div className="container mx-auto max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">
            TIN TỨC & SỰ KIỆN
          </h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
          >
            {baiVietLienQuan.map((slide) => {
              const imageUrl =
                slide?.attributes?.seo?.thumbnail?.data?.attributes?.url;
              return (
                <SwiperSlide key={slide.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-6 bg-white rounded-lg shadow-lg">
                    <div className="w-full md:order-2">
                      <Image
                        src={
                          imageUrl
                            ? `${process.env.NEXT_PUBLIC_URL_BE}${imageUrl}`
                            : "/path/defalut.jpg"
                        }
                        alt={slide?.attributes?.title}
                        width={350}
                        height={183}
                        layout="responsive"
                        className="rounded-lg"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center md:order-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                        {slide?.attributes?.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {slide?.attributes?.seo?.description}
                      </p>
                      <Link
                        href={slide?.attributes?.slug}
                        className="bg-blue-600 md:w-[50%] text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 text-center"
                      >
                        Xem tiếp
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SlideTinTuc;
