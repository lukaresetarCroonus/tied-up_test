"use client";
import { useEffect } from "react";
import Thumb from "../Thumb/Thumb";
import Aos from "aos";

const RecommendedProducts = ({ products }) => {
  useEffect(() => {
    Aos.init();
  });
  return (
    <div
      data-aos="fade-right"
      className="max-sm:w-[95%] max-sm:mx-auto md:mx-[3rem] max-sm:mt-[3rem]  overflow-visible"
    >
      <div className="flex justify-between w-full items-center">
        <h1 className="text-[1.5rem] font-bold max-md:text-[1.1rem] ">
          Izdvajamo za vas
        </h1>
      </div>
      <div className="max-sm:mt-[1rem] mt-[2.5rem]">
        <Thumb slider={true} data={products} />
      </div>
    </div>
  );
};

export default RecommendedProducts;
