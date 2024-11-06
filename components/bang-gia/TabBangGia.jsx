"use client";
import React, { useState } from "react";
import Image from "next/image";
import ModalBaoGia from "../../components/layouts/ModalBaoGia";
const servicesData = [
  {
    category: "Thẩm mỹ vòng 1",
    services: [
      {
        id: 1,
        name: "NÂNG NGỰC 4D (NANO)",
        price: "Giá 58.000.000Đ",
        img: "/bang-gia/giatreda-p1.jpg",
      },
      {
        id: 2,
        name: "NÂNG NGỰC 6D KHÔNG CHẠM (NANO CHIP)",
        price: "Giá 79.000.000Đ",
        img: "/bang-gia/giatreda-p1.jpg",
      },
      {
        id: 3,
        name: "NÂNG NGỰC 6D VIP (NANO CHIP LINH HOẠT)",
        price: "Giá 99.000.000Đ",
        img: "/bang-gia/giatreda-p1.jpg",
      },
    ],
  },
  {
    category: "Trẻ hóa da",
    services: [
      {
        id: 1,
        name: "CĂNG CHỈ X-LINE BIO YOUNG",
        price: "Từ 23.000.000Đ - 99.000.000Đ/lần",
        img: "/bang-gia/giatreda-p1.jpg",
      },
      {
        id: 2,
        name: "TRẺ HÓA MESO YOUNG",
        price: "Giá 12.000.000Đ/lần",
        img: "/bang-gia/giatreda-p1.jpg",
      },
      {
        id: 3,
        name: "TIÊM TRẺ HÓA PROFHILO",
        price: "Giá 20.000.000Đ/2CC",
        img: "/bang-gia/giatreda-p1.jpg",
      },
      {
        id: 4,
        name: "TRẺ HÓA THERMAGE FLX",
        price: "Từ 70.000.000Đ/lần (Tùy vùng)",
        img: "/bang-gia/giatreda-p1.jpg",
      },
    ],
  },
];

const TabBangGia = ({ priceData }) => {
  const [selectedCategory, setSelectedCategory] = useState(priceData[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Sidebar Tab on mobile */}
      <div className="block md:hidden mb-4">
        <ul className="flex overflow-x-auto">
          {priceData.map((category, index) => {
            return (
              <li
                key={index}
                className={`p-4 cursor-pointer whitespace-nowrap ${
                  selectedCategory.category === category.category
                    ? "bg-blue-200 text-blue-700 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.category}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Tab on desktop */}
        <div className="hidden md:block md:w-1/4 border-r pr-4">
          <ul>
            {priceData.map((category, index) => {
              return (
                <li
                  key={index}
                  className={`p-4 cursor-pointer ${
                    selectedCategory.category === category.category
                      ? "bg-blue-200 text-blue-700 font-bold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.category}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4 md:pl-8">
          <h2 className="text-3xl font-bold mb-4">
            {selectedCategory.category}
          </h2>
          <p className="text-gray-600 mb-8">{selectedCategory.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedCategory.services.map((service) => {
              const imageUrl = service.image.data.attributes.url;
              return (
                <div key={service.id} className="bg-white rounded-lg shadow-md">
                  <Image
                    src={process.env.NEXT_PUBLIC_URL_BE + imageUrl}
                    alt={service.title}
                    width={200}
                    height={200}
                    className="rounded-t-lg object-cover w-full h-48"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            * Trên đây là giá niêm yết của các dịch vụ chính. Quý khách vui lòng
            đăng ký thông tin để nhận ưu đãi hấp dẫn và bảng giá chi tiết tất cả
            các dịch vụ.
          </p>

          <div className="flex justify-center mt-6">
            <button
              onClick={showModal}
              className="bg-pink-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-pink-600 transition duration-200"
            >
              ƯU ĐÃI HOT - NHẬN NGAY
            </button>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <ModalBaoGia visible={isModalVisible} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default TabBangGia;
