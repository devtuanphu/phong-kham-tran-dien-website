"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import Marquee from "./Marquee";
import ModalBaoGia from "./ModalBaoGia";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const menuItems = [
    { title: "Dịch Vụ", link: "/dich-vu" },
    { title: "Về Chúng Tôi", link: "/ve-chung-toi" },
    { title: "Bảng Giá", link: "/bang-gia" },
    { title: "Tin Tức", link: "/tin-tuc" },
    { title: "Liên Hệ", link: "/lien-he" },
  ];

  return (
    <>
      <div className="sticky top-0 z-50">
        {" "}
        <Marquee />
        <div className="py-4 shadow-lg   bg-white">
          <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={300}
                height={300}
                className="w-[200px] md:w-[300px]"
              />
            </Link>

            {/* Nút Hamburger cho Mobile */}
            <div className="block lg:hidden">
              {isOpen ? (
                <CloseOutlined
                  className="text-3xl text-[#304ba6]"
                  onClick={() => setIsOpen(!isOpen)}
                />
              ) : (
                <MenuOutlined
                  className="text-3xl text-[#304ba6]"
                  onClick={() => setIsOpen(!isOpen)}
                />
              )}
            </div>

            {/* Menu và Nút Đặt Lịch cho màn hình lớn */}
            <div className="hidden lg:flex space-x-8 items-center">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className="text-[#304ba6] font-medium text-lg"
                >
                  {item.title}
                </Link>
              ))}
              {/* Nút Đặt Lịch Ngay */}
              <button
                onClick={showModal}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Đặt Lịch Ngay
              </button>
            </div>
          </div>

          {/* Sidebar cho mobile */}
          <div
            className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex flex-col mt-16 space-y-6 pl-6">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={300}
                  height={300}
                  className="w-[200px] md:w-[300px]"
                />
              </Link>
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className="text-[#304ba6] hover:text-blue-500 font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              {/* Nút Đặt Lịch Ngay trong Sidebar */}
              <button
                onClick={showModal}
                className=" w-[80%] bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Đặt Lịch Ngay
              </button>
            </div>
          </div>

          {/* Overlay khi sidebar mở */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            ></div>
          )}
        </div>
      </div>
      {isModalVisible && (
        <ModalBaoGia visible={isModalVisible} onClose={handleModalClose} />
      )}
    </>
  );
};

export default Header;
