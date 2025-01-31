import Link from "next/link";
import React from "react";
import SliderHeader from "./SliderHeader";
import Translate from "@/components/Translate/Translate";

function HeaderTop() {
  return (
    <div className="bg-[#b89980] h-8 w-full flex items-center justify-between px-[5rem] text-black">
      <div>
        <Link
          href="https://www.facebook.com/masnetiedup/"
          className="hover:text-white text-base font-light"
          target="_blank"
          rel={`noreferrer noopener nofollow`}
        >
          Facebook
        </Link>
        <span className={`mx-2`}>-</span>
        <Link
          href="https://www.instagram.com/masnetiedup/"
          className="hover:text-white text-base font-light"
          target="_blank"
          rel={`noreferrer noopener nofollow`}
        >
          Instagram
        </Link>
        <span className="mx-2">-</span>
        <Link
          href="https://www.linkedin.com/company/83116653/admin/feed/posts/"
          className="hover:text-white text-base font-light"
          target="_blank"
          rel={`noreferrer noopener nofollow`}
        >
          LinkedIn
        </Link>
      </div>
      <SliderHeader />
      <div className="flex items-center">
        <Translate />
        <span className="text-base font-light">Call Centar: </span>
        <Link
          href={`tel:${process.env.TELEPHONE2}`}
          className="text-base font-light hover:text-white"
        >
          {process.env.TELEPHONE2}
        </Link>
      </div>
    </div>
  );
}

export default HeaderTop;
