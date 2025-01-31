import React from "react";
import Image from "next/image";
import arrow from "@/assets/Icons/right-chevron.png";

const LeftIcon = () => {
  return (
    <>
      <Image
        src={arrow}
        width={16}
        height={16}
        alt="Tiedup"
        className="rotate-180"
      />
    </>
  );
};

export default LeftIcon;
