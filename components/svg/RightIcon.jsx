import React from "react";
import Image from "next/image";
import arrow from "@/assets/Icons/right-chevron.png";

const RightIcon = () => {
  return (
    <>
      <Image src={arrow} width={16} height={16} alt="Tiedup" className="" />
    </>
  );
};

export default RightIcon;
