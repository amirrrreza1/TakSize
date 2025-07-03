"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
const SliderStory = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Swiper
        // slidesPerView={8}
        // spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 7,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Link
                href={`/${item.categoryId}`}
                className="md:flex flex-col justify-center items-center gap-2"
              >
                <div className=" flex flex-col justify-center items-center p-px">
                  <div className="rounded-full aspect-square ">
                    <Image
                      className="w-[60px] h-[60px] rounded-[50%] object-cover"
                      src={`https://api.taksize.com/${item.picture}`}
                      alt="shirt"
                      width={60}
                      height={60}
                    />
                  </div>
                  <p className="text-[12px] block text-center text-gray-600">
                    {item.title}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderStory;
