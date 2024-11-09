"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

const videos = [
  {
    id: 1,
    title: "Từ ám ảnh HÀM HÔ hóa HOTGIRL XINH ĐẸP chỉ sau 1 ĐÊM",
    description:
      "Bác sĩ Tú Dung BẬT MÍ 10 bí mật ĐỘNG TRỜI về Phẫu thuật hàm hô biến XẤU thành ĐẸP chỉ sau 1 GIẤC NGỦ",
    image: "/home/sddefault.jpg",
  },
  {
    id: 2,
    title: "Doanh nhân Việt Kiều chi TIỀN TỶ làm răng ???",
    description:
      "CHẤN ĐỘNG doanh nhân VIỆT KIỀU chi khủng 500 TRIỆU Trồng răng Implant lão hóa ngược, ĐẸP KHÔNG TUỔI",
    image: "/home/sddefault.jpg",
  },
  {
    id: 3,
    title: "Ngăn KHẨU MIỆNG, 10 MỐI LƯU Ý...",
    description:
      "Bác sĩ Tú Dung NGẠO NGÃ trào lưu tạo MÔI TRÁI TIM, chẳng khác MỎ CHIM của Spa chui",
    image: "/home/sddefault.jpg",
  },
  {
    id: 4,
    title: "Ngăn KHẨU MIỆNG, 10 MỐI LƯU Ý...",
    description:
      "Bác sĩ Tú Dung NGẠO NGÃ trào lưu tạo MÔI TRÁI TIM, chẳng khác MỎ CHIM của Spa chui",
    image: "/home/sddefault.jpg",
  },
];

const VideoSlider = ({ slide }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Slide trung tâm mặc định

  return (
    <div className="bg-[#f5fafd] py-8 px-4 md:px-0">
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: false,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
            centeredSlides: true,
          },
        }}
      >
        {slide.map((item, index) => {
          const imageUrl = item.image.data.attributes.url;
          return (
            <SwiperSlide key={item.id} className="flex justify-center w-full">
              <div
                className={`relative transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "z-20 scale-105 opacity-100"
                    : "z-10 scale-90 opacity-60"
                } w-full h-[200px] md:h-[250px]`}
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_URL_BE + imageUrl ||
                    "/path/defalut.jpg"
                  }
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg "
                />

                <div className="absolute bottom-0 left-0 w-full p-2 bg-[#304ba6] text-white text-center">
                  <p className="font-semibold line-clamp-1">{item.title}</p>
                  <p className="text-xs line-clamp-2">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default VideoSlider;
