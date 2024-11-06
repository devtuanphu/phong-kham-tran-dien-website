"use client";
import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import Image from "next/image";
import { ENDPOINT } from "../../enums/endpoint.enum";
import axios from "axios";

const ModalBaoGia = ({ visible, onClose }) => {
  const [form] = Form.useForm(); // Sử dụng Ant Design Form instance để kiểm soát form

  const handleSendData = async (values) => {
    try {
      const response = await axios.post(
        `${ENDPOINT.GET_KHACH_HANG}`,
        {
          data: {
            // Bọc dữ liệu bên trong "data" để phù hợp với Strapi
            name: values.fullname,
            phone: values.phone,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`, // Thêm token vào headers
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        message.success("Đăng ký tư vấn thành công!");
        form.resetFields(); // Reset form sau khi gửi thành công
        onClose(); // Đóng modal nếu cần
      } else {
        message.error("Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      message.error("Đã xảy ra lỗi khi gửi dữ liệu. Vui lòng thử lại!");
    }
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null} centered>
      <div style={{ textAlign: "center" }}>
        {/* Ảnh tiêu đề */}
        <div style={{ marginBottom: 24 }}>
          <Image
            src="/head.webp"
            alt="Doctor Header"
            width={400}
            height={100}
            className="w-full "
          />
        </div>

        {/* Form nhập thông tin */}
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: "100%" }}
          onFinish={handleSendData} // Thêm onFinish để xử lý khi submit form
        >
          <Form.Item
            label="Họ và tên:"
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input
              placeholder="Họ và tên"
              style={{ borderRadius: "8px", height: "40px" }}
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại:"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ!" },
            ]}
          >
            <Input
              placeholder="Số điện thoại"
              style={{ borderRadius: "8px", height: "40px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#fbb6ce",
                borderColor: "#fbb6ce",
                color: "black",
                fontWeight: "bold",
                borderRadius: "24px",
                height: "48px",
              }}
            >
              Đăng ký tư vấn
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalBaoGia;
