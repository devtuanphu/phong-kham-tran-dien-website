"use client";
import React from "react";
import AboutSlider from "./AboutSlider";
const About = ({ about, slide }) => {
  return (
    <div className="bg-[#f5fafd] py-8 px-4 md:px-0">
      <div className="container mx-auto max-w-4xl">
        {/* Tiêu đề */}
        <h2 className="text-[#2e446b] text-2xl md:text-3xl font-bold text-center mb-4">
          {about.title}
        </h2>

        {/* Nội dung giới thiệu */}
        <div className="bg-white p-6 md:p-8 rounded-md shadow-md border-l-4 border-[#8aba39]">
          <p className="text-[#2e446b] font-semibold mb-4">
            {about.mainDescribe}
          </p>
          <p className="text-[#2e446b] leading-relaxed">{about.subDescribe}</p>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl">
        <AboutSlider slide={slide} />
      </div>
    </div>
  );
};

export default About;
