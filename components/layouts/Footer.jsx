"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import ModalBaoGia from "./ModalBaoGia";
import { ENDPOINT } from "../../enums/endpoint.enum";
import axios from "axios";

const Footer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${ENDPOINT.GET_FOOTER}?populate=logoWhite`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`, // Set the Bearer token in the headers
        },
      });

      // Assuming the response data is what you want to set in your state
      setData(res.data?.data?.attributes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData(); // Call getData on component mount
  }, []);

  const logo = data?.logoWhite?.data?.attributes?.url;

  return (
    <footer className="bg-[#304ba6] text-white py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          {/* Logo and Info */}
          <div className="lg:w-1/3 mb-6 lg:mb-0">
            <Image
              src={
                logo
                  ? process.env.NEXT_PUBLIC_URL_BE + logo
                  : "/path/defalut.jpg"
              } // Đổi đường dẫn này thành đường dẫn ảnh của bạn
              alt="Trần Điền Logo"
              width={150} // Đặt chiều rộng phù hợp
              height={50} // Đặt chiều cao phù hợp
              className="mb-4"
            />
            <div className="text-sm">
              <p className="flex items-center mb-2">
                <FaCalendarAlt className="mr-2" />
                Lịch làm việc: {data.time}
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                {data.address}
              </p>
            </div>
          </div>
          {/* Hotline and Booking */}
          <div className="lg:w-1/3 flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6 lg:mb-0">
            <a href={`tel:${data.phone}`}>
              <div className="text-center">
                <div className="flex items-center justify-center border border-white p-4 rounded-md mb-2">
                  <FaPhoneAlt className="text-2xl mr-2" />
                  <p className="text-lg font-bold">{data.phone}</p>
                </div>
                <p>HOTLINE</p>
              </div>
            </a>
            <button onClick={showModal}>
              <div className="text-center">
                <div className="flex items-center justify-center border border-white p-4 rounded-md mb-2">
                  <FaCalendarAlt className="text-2xl mr-2" />
                  <p className="text-lg font-bold">ĐẶT LỊCH</p>
                </div>
                <p>NHẬN TƯ VẤN</p>
              </div>
            </button>
          </div>
          {/* Company Info */}
          <div className="lg:w-1/3 text-sm">
            <h3 className="text-lg font-semibold mb-2">{data.titleFooter}</h3>
            <div dangerouslySetInnerHTML={{ __html: data.contentFooter }}></div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <ModalBaoGia visible={isModalVisible} onClose={handleModalClose} />
      )}
    </footer>
  );
};

export default Footer;
