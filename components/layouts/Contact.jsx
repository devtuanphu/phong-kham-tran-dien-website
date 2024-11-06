"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ModalBaoGia from "./ModalBaoGia";
import { ENDPOINT } from "../../enums/endpoint.enum";
import axios from "axios";

// Đường dẫn của các icon SVG

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hotline, setHotline] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const getData = async () => {
    try {
      const response = await axios.get(`${ENDPOINT.GET_HOTLINE}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`, // Sử dụng token nếu cần thiết
        },
      });
      const data = response.data;
      setHotline(data?.data?.attributes);
    } catch (error) {
      console.error("Error fetching hotline data:", error);
    }
  };

  // Gọi hàm getData khi component mount (nếu cần)
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {hotline && (
        <div className="z-[1000] fixed right-4 bottom-4 flex flex-col items-center space-y-2 md:right-4 md:bottom-1/4">
          <div className="bg-white rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-100 transition-all">
            <a href={`tel:${hotline?.phone}`}>
              <Image
                src="/icon/phone-icon-800x800.png"
                alt="Phone"
                width={50}
                height={50}
              />
            </a>
          </div>
          <div className="bg-white rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-100 transition-all">
            <a target="_blank" href={`https://zalo.me/${hotline?.zalo}`}>
              <Image src="/icon/zalo.svg" alt="Zalo" width={50} height={50} />
            </a>
          </div>
          <div className="bg-white rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-100 transition-all">
            <button onClick={showModal}>
              <Image
                src="/icon/icon-bell.svg"
                alt="Bell"
                width={50}
                height={50}
              />
            </button>
          </div>
        </div>
      )}
      {isModalVisible && (
        <ModalBaoGia visible={isModalVisible} onClose={handleModalClose} />
      )}
    </>
  );
};

export default Contact;
