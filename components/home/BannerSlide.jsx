"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";

const BannerSlide = ({ banner }) => {
  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
      {banner.map((slide) => {
        // Lấy URL của ảnh từ Strapi
        const imageUrl = slide.image.data.attributes.url;
        return (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[200px] md:h-[400px] lg:h-[500px]">
              <Image
                src={process.env.NEXT_PUBLIC_URL_BE + imageUrl}
                alt={slide.alt}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default BannerSlide;
