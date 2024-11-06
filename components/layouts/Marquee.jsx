"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { ENDPOINT } from "../../enums/endpoint.enum";

const MarqueeComponent = () => {
  const [data, setData] = useState("");
  const getData = async () => {
    try {
      const res = await axios.get(`${ENDPOINT.GET_INTRO}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`, // Set the Bearer token in the headers
        },
      });

      // Assuming the response data is what you want to set in your state
      setData(res.data?.data?.attributes?.label);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData(); // Call getData on component mount
  }, []);

  return (
    <div className="bg-[#304ba6] py-2">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        {" "}
        <Marquee gradient={false} speed={100}>
          <p className="text-white px-4 font-bold">{data || ""}</p>
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeComponent;
