"use client";
import React, { useState } from "react";
import Image from "next/image";

import ModalBaoGia from "./ModalBaoGia";

const BaoGia = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          {/* Nhận báo giá */}
          <div className="flex flex-col items-center">
            <Image
              src="/baogia.svg"
              alt="Nhận báo giá"
              width={50}
              height={50}
            />
            <h3 className="text-lg font-semibold mt-4">NHẬN BÁO GIÁ</h3>
            <button
              onClick={showModal}
              className="mt-4 px-6 py-2 border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition duration-300"
            >
              Nhận ngay
            </button>
          </div>

          {/* Đặt lịch tư vấn */}
          <div className="flex flex-col items-center">
            <Image
              src="/tuvan.svg"
              alt="Đặt lịch tư vấn"
              width={50}
              height={50}
            />
            <h3 className="text-lg font-semibold mt-4">ĐẶT LỊCH TƯ VẤN</h3>
            <button
              onClick={showModal}
              className="mt-4 px-6 py-2 border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition duration-300"
            >
              Tư vấn ngay
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <ModalBaoGia visible={isModalVisible} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default BaoGia;
