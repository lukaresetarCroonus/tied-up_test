"use client";
import { useCartContext } from "@/app/api/cartContext";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { get, list } from "@/app/api/api";
import useDebounce from "@/hooks/useDebounce";
import {
  useCartBadge,
  useSearch,
  useWishlistBadge,
} from "@/hooks/croonus.hooks";
import cancel from "@/assets/Icons/cancel.png";
import { usePathname, useRouter } from "next/navigation";

const HeaderIcons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const searchRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (myRef.current && !myRef.current.contains(e.target)) {
        // Check if the clicked element is the search input
        if (e.target !== searchRef.current) {
          setSearchTerm("");
          setSearchIsOpen(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const myRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm?.length >= 3) {
      setSearchIsOpen(false);
      router.push(`/search?search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data, isFetching } = useSearch({
    searchTerm: debouncedSearch,
    isSearchPage: false,
  });

  const { data: cartCount, refetch } = useCartBadge();
  const { data: wishListCount } = useWishlistBadge();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("kupovina")) {
      refetch();
    }
  }, [pathname]);

  const input_ref = useRef(null);

  useEffect(() => {
    if (searchIsOpen) {
      input_ref?.current?.focus();
    }
  }, [searchIsOpen]);

  return (
    <div className="flex items-center">
      <div>
        <Image
          src="/search.png"
          width={21}
          height={21}
          className="object-cover"
          alt="search"
          onClick={() => {
            setSearchIsOpen(!searchIsOpen);
          }}
        />
      </div>
      <Link href={`/lista-zelja`}>
        <div className="relative">
          <Image
            src="/heart.png"
            width={21}
            height={21}
            className="object-cover mx-5"
            alt="heart"
          />
          {wishListCount ? (
            <span className="absolute -top-2.5 text-white right-1 bg-[#215352] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
              {wishListCount}
            </span>
          ) : null}
        </div>
      </Link>
      <a href="/korpa">
        <div className="relative">
          <Image
            src="/shopping-bag.png"
            width={21}
            height={21}
            className="object-cover"
            alt="shopping-bag"
          />
          {cartCount ? (
            <span className="absolute -top-2 text-white -right-3 bg-[#215352] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
              {cartCount}
            </span>
          ) : null}
        </div>
      </a>
      <div
        className={
          searchIsOpen
            ? `bg-white py-[8rem] shadow-xl fixed top-0 left-0 w-full translate-y-0 duration-[700ms] transition-all min-h-[30%] z-[21] flex justify-center items-center`
            : `bg-white  py-[8rem] fixed shadow-xl top-0 left-0 w-full -translate-y-full duration-[700ms] transition-all min-h-[30%] z-[21] flex justify-center items-center`
        }
      >
        <div className="shadow-sm bg-white px-[4rem] py-[3rem] rounded-md relative border border-[#b2b2b2]">
          <form onSubmit={(e) => handleSearch(e)} className="relative">
            <div className="flex items-center gap-5 relative">
              <input
                ref={input_ref}
                type="text"
                placeholder="Pretraži proizvode"
                className="w-[700px] h-[3rem] border-l-0 placeholder:text-sm border-t-0 border-r-0 border-b-gray-300 focus:outline-none focus:border-croonus-2 focus:ring-0 "
                onInput={(event) => {
                  setSearchTerm(event.target.value);

                  if (event.target.value.length >= 3) {
                    setLoading(true);
                  }
                }}
                value={searchTerm}
              />

              {searchTerm?.length < 3 && searchTerm?.length >= 1 && (
                <span
                  className={`absolute text-sm top-[0.8rem] right-[2rem] text-red-500`}
                >
                  Unesite najmanje 3 karaktera.
                </span>
              )}
            </div>
            <div ref={searchRef}>
              {data?.items?.length > 0 && searchTerm?.length >= 3 ? (
                <div className="absolute top-10 w-full bg-white shadow-xl rounded-b-lg max-h-[350px] overflow-y-auto customscroll2">
                  <div className="flex flex-col gap-2 w-full relative">
                    <div>
                      {data?.items?.slice(0, 6)?.map((item) => {
                        return (
                          <Link
                            href={`/${item?.link?.link_path}`}
                            className="h-[83px]"
                            onClick={() => {
                              setSearchTerm("");
                              setSearchIsOpen(false);
                            }}
                          >
                            <div className="flex items-center justify-between h-[83px] p-2.5 hover:bg-[#f0f0f0] cursor-pointer">
                              <div className="flex items-center p-1 gap-5 max-h-[83px]">
                                <div>
                                  {item?.image[0]?.toString() && (
                                    <Image
                                      src={item?.image[0]?.toString()}
                                      width={60}
                                      height={60}
                                      alt="Dioda"
                                      className="object-contain"
                                    />
                                  )}
                                </div>

                                <p className="text-sm">
                                  {item.basic_data.name}
                                </p>
                              </div>
                              <p className="italic text-xs">
                                U {item?.categories[0]?.name}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* {searchData?.length > 6 && (
                      <div
                        className="flex py-1.5 justify-center items-center sticky bottom-0 w-full bg-[#f0f0f0] text-black hover:bg-opacity-90 cursor-pointer"
                        onClick={handleSearch}
                      >
                        {searchData?.length > 6 ? (
                          <span>
                            Prikaži sve rezultate ( još&nbsp;
                            {searchData.length - 6} )
                          </span>
                        ) : null}
                      </div>
                    )} */}
            </div>
          </form>
          <span
            onClick={() => {
              setSearchIsOpen(!searchIsOpen);
              setSearchTerm("");
            }}
            className="absolute text-lg hover:text-red-500 cursor-pointer top-3 right-3"
          >
            <Image src={cancel} width={22} height={22} alt="Tiedup" />
          </span>
        </div>
      </div>
      {searchIsOpen ? (
        <div
          onClick={() => {
            setSearchIsOpen(false);
            setSearchTerm("");
          }}
          className="bg-black bg-opacity-40 w-full fixed w-screen h-screen z-1 left-0 top-0"
        ></div>
      ) : null}
    </div>
  );
};

export default HeaderIcons;
