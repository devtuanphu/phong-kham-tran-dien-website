"use client";
import React from "react";
import Image from "next/image";

const SectionChuyenSau = ({ contentServices }) => {
  const services = [
    {
      id: 1,
      title: "THẨM MỸ KHUÔN MẶT",
      subtitle: "CHUYÊN KHOA",
      img: "/home/service1.jpg",
      bgColor: "bg-[#f5e5d7]",
    },
    {
      id: 2,
      title: "CHỈNH HÌNH HÀM MẶT",
      subtitle: "CHUYÊN KHOA",
      img: "/home/service1.jpg",
      bgColor: "bg-[#f5e5d7]",
    },
    {
      id: 3,
      title: "TẠO HÌNH VÓC DÁNG",
      subtitle: "CHUYÊN KHOA",
      img: "/home/service1.jpg",
      bgColor: "bg-[#dce7f5]",
    },
    {
      id: 4,
      title: "TRẺ HÓA & ĐIỀU TRỊ DA",
      subtitle: "VIỆN",
      img: "/home/service1.jpg",
      bgColor: "bg-[#dce7f5]",
    },
  ];

  return (
    <div className="w-full px-2 py-10 bg-[#f5fafd]">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          THẨM MỸ CHUYÊN SÂU
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contentServices.map((service) => {
            const imageUrl = service.image.data.attributes.url;
            return (
              <div
                key={service.id}
                className={`flex bg-[#f5e5d7] rounded-lg overflow-hidden shadow-md`}
              >
                <div className="w-1/2">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_URL_BE + imageUrl ||
                      "/path/defalut.jpg"
                    }
                    alt={service.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-md font-semibold text-gray-600">
                    {service.title}
                  </h3>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionChuyenSau;
