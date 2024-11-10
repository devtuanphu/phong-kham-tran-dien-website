"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Image from "next/image";

// Cấu hình Swiper với hiệu ứng trượt slide

const ChuyenGia = ({ doctor }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleDoctorClick = (index) => {
    setActiveIndex(index);
    swiperRef.current.swiper.slideTo(index);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#005082",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#a1eafb",
            marginBottom: "10px",
          }}
        >
          {doctor.title}
        </h2>
        <p style={{ fontSize: "16px", color: "#a1eafb", marginBottom: "30px" }}>
          {doctor.description}
        </p>

        {/* Swiper cho phần danh sách các bác sĩ */}
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          loop={true}
          style={{ margin: "0 auto", paddingTop: "20px" }}
        >
          {doctor?.doctors.map((doctor, index) => {
            const imageUrl = doctor?.image?.data?.attributes?.url;

            return (
              <SwiperSlide
                key={doctor.id}
                onClick={() => handleDoctorClick(index)}
              >
                <div
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "12px",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={
                      imageUrl
                        ? process.env.NEXT_PUBLIC_URL_BE + imageUrl
                        : "/path/defalut.jpg"
                    }
                    alt={doctor.name}
                    width={250}
                    height={350}
                    className="object-contain mx-auto w-full"
                  />

                  <div className="bg-[#003f5c] p-2 rounded-lg shadow-md text-center text-white min-h-[80px] h-[80px] flex flex-col justify-center">
                    <h4
                      className={`text-base font-bold truncate ${
                        activeIndex === index ? "text-yellow-500" : ""
                      }`}
                    >
                      {doctor.name}
                    </h4>
                    <p
                      className={`text-sm line-clamp-2 ${
                        activeIndex === index
                          ? "text-yellow-500"
                          : "text-[#a1eafb]"
                      }`}
                    >
                      {doctor.position}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Swiper cho phần chi tiết của bác sĩ */}
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          effect="slide"
          loop={false}
          style={{ margin: "0 auto", paddingTop: "20px" }}
        >
          {doctor?.doctors.map((doctor, index) => {
            const imageUrl = doctor?.image?.data?.attributes?.url;
            return (
              <SwiperSlide key={doctor.id}>
                <div className="bg-[#01265b] pb-[30px] md:pb-0 pt-[30px] px-[30px]">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="hidden md:block col-span-4">
                      <Image
                        src={
                          imageUrl
                            ? process.env.NEXT_PUBLIC_URL_BE + imageUrl
                            : "/path/defalut.jpg"
                        }
                        alt={doctor.name}
                        width={250}
                        height={350}
                        className="object-cover mx-auto w-full"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-8 text-left">
                      <h3 className="text-[#ffd700] font-bold text-xl mb-2">
                        {doctor.name}
                      </h3>
                      <p className="text-[#a1eafb] text-lg mb-4">
                        {doctor.position}
                      </p>
                      <div
                        className="text-[#d4f1f4]"
                        dangerouslySetInnerHTML={{ __html: doctor.detail }}
                      ></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ChuyenGia;
