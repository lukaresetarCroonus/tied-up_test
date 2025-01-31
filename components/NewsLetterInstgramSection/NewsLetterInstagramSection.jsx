"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import InstragramSection from "../sections/homepage/InstagramSection";
import { post } from "@/app/api/api";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const NewsLetterInstagramSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email?.includes("@")) {
      setError(true);
      toast.error("Unesite validan email", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setError(false);
      await post("/newsletter", { email: email }).then((response) => {
        if (!response?.code) {
          setEmail("");
          toast.error(response?.payload?.message || "Error 404", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError(true);
        } else {
          setEmail("");
          setError(false);
          toast.success(response?.payload?.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  };

  const { data: instagramImages } = useQuery({
    queryKey: ["instagramImages"],
    queryFn: async () => {
      const resData = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM}`
      );

      const data = await resData.json();

      return data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div className="max-md:mt-[6rem] mt-[12rem] gap-14 2xl:gap-28 max-md:w-[95%] mx-auto md:w-full md:px-[3rem] justify-center flex text-center">
        <div className="self-center">
          <h2 className="font-bold text-[30px] md:text-[40px] text-black">
            Prijava na newsletter
          </h2>
          <div className="md:w-[70%] mx-auto">
            <p className="text-[20px] font-light text-black my-8">
              Prijavite se na naš newsletter i budite u toku sa svim novostima i
              akcijama.
            </p>
            <form className="relative" onSubmit={onSubmit}>
              <input
                placeholder="Unesite svoj email"
                title="Unesite validan email"
                type="text"
                id="email"
                name="email"
                onChange={changeHandler}
                value={email}
                className={`${
                  error ? "border-red-500" : "border-[#b2b2b2]"
                } w-full max-md:w-full py-4 border rounded px-4 placeholder:text-base placeholder:text-[#cecece] placeholder:font-normal  focus:border-[#cecece] focus:outline-none focus:ring-0`}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
                type="submit"
              >
                <Image src={"/send.png"} width={32} height={38} />
              </button>
            </form>
          </div>

          {/* <Link
            href="/"
            className="text-base text-black mt-6 font-bold underline block"
          >
            Želim da otkažem pretplatu na bilten.
          </Link> */}
        </div>
        {/* <div>
          <InstragramSection instagramImages={instagramImages} />
        </div> */}
      </div>
    </div>
  );
};

export default NewsLetterInstagramSection;
