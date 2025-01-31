import WishlistPage from "@/components/Wishlist/Wishlist";
import Link from "next/link";
import { Suspense } from "react";
export const metadata = {
  title: "Lista želja | Tied Up",
  description: "Dobrodošli Tied Up Online Shop",
  keywords: ["Tied Up", "online", "shop"],
};
const Wishlist = async () => {
  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>Lista želja</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          Lista želja
        </h1>
      </div>

      <WishlistPage />
    </>
  );
};

export default Wishlist;
