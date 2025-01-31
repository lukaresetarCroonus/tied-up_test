"use client";
import {
  useAddToCart,
  useAddToWishlist,
  useIsInWishlist,
  useProductThumb,
  useRemoveFromWishlist,
} from "@/hooks/croonus.hooks";
import { Prices } from "@/_components/shared/prices";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { deleteMethod, post } from "@/app/api/api";
import { toast } from "react-toastify";
import { icons } from "@/_lib/icons";
import { pushToDataLayer } from "@/_services/data-layer";

export const Thumb = ({
  id,
  categoryId = "*",
  refreshWishlist = () => {},
  productsPerViewMobile = 1,
  is_details = false,
}) => {
  const { data: product } = useProductThumb({
    id: id,
    categoryId: categoryId ?? "*",
  });

  const { mutate: addToWishlist, isSuccess: isAdded } = useAddToWishlist();
  const { mutate: removeFromWishlist, isSuccess: isRemoved } =
    useRemoveFromWishlist();

  const { data: wishlist, refetch } = useIsInWishlist({ id: id });

  const wishlist_data = {
    is_in_wishlist: wishlist?.exist,
    id: wishlist?.wishlist_item_id,
  };

  useEffect(() => {
    refetch();
    refreshWishlist();
  }, [isAdded, isRemoved]);

  const { mutate: addToCart, isSuccess: is_added_to_cart } = useAddToCart();
  const [swiper, setSwiper] = useState(null);

  const renderDiscountPercentage = ({
    price: {
      discount: { campaigns },
    },
  }) => {
    let discounts = campaigns?.map(({ calc: { original, price } }) => {
      let price_num = Number(price);
      let original_num = Number(original);

      let discount = Math.round(
        ((original_num - price_num) / original_num) * 100
      );

      return (
        <p
          className={`bg-[#215352] px-[0.85rem] py-1 rounded-lg font-bold`}
        >{`- ${discount}%`}</p>
      );
    });

    return (
      <div
        className={`absolute right-2 top-2 z-[5] text-white text-[13px] flex flex-col gap-2`}
      >
        {discounts}
      </div>
    );
  };

  const renderStickers = ({ stickers }) => {
    let stickers_tmp = stickers?.map(({ name }, i) => {
      return (
        <p
          key={`sticker-${i}`}
          className={`bg-[#E7DCD1] w-fit px-[0.85rem] py-1 text-black rounded-lg font-bold group-hover:bg-[#215352] group-hover:text-white transition-colors duration-500`}
        >
          {name}
        </p>
      );
    });

    return (
      <div
        className={`absolute left-2 top-2 z-[5] text-white text-[13px] flex flex-col gap-2`}
      >
        {stickers_tmp}
      </div>
    );
  };
  return (
    <div className={`col-span-1 flex flex-col relative group !h-full`}>
      {product?.price?.discount?.active &&
        renderDiscountPercentage({ price: product?.price })}

      {product?.stickers?.length > 0 &&
        renderStickers({ stickers: product?.stickers })}

      <div className={`!relative !overflow-hidden`}>
        <Swiper
          modules={[Pagination]}
          pagination={true}
          direction={"horizontal"}
          rewind={product?.image?.length > 1}
          breakpoints={{
            1024: {
              pagination: {
                enabled: false,
              },
              direction: "horizontal",
            },
          }}
          className={`categoryImageSwiper !relative !overflow-hidden`}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {(product?.image_data ?? [])?.map(
            (
              { url, descriptions: { alt }, file_data: { height, width } },
              index
            ) => {
              return (
                <SwiperSlide
                  key={index}
                  className={`!overflow-hidden !relative`}
                >
                  <Link
                    href={`/${product?.link?.link_path}`}
                    className={`flex-1`}
                  >
                    <Image
                      loading={`eager`}
                      src={convertHttpToHttps(url ?? "")}
                      alt={alt ?? product?.basic_data?.name}
                      sizes={"100vw"}
                      width={width ?? 0}
                      height={height ?? 0}
                      priority={true}
                      className={`!w-full !h-auto group-hover:scale-110 transition-all duration-500 aspect-square`}
                    />
                  </Link>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </div>
      <div className={`flex flex-wrap flex-col items-start`}>
        <div className="mt-auto pt-[0.813rem] flex items-start justify-between relative w-full">
          <Link
            href={`/${product?.link?.link_path}`}
            className="max-md:text-[0.85] text-left uppercase text-[0.813rem] relative max-md:leading-4 max-sm:line-clamp-2 group-hover:text-[#215352]"
          >
            {product?.basic_data?.name}
          </Link>
          <div
            onClick={() => {
              if (wishlist_data?.is_in_wishlist) {
                pushToDataLayer("remove_from_wishlist", product);
                removeFromWishlist({ id: wishlist_data?.id });
              } else {
                addToWishlist({ id: product?.basic_data?.id_product });
                pushToDataLayer("add_to_wishlist", product);
              }
            }}
            className={`rounded-full  cursor-pointer `}
          >
            {wishlist_data?.is_in_wishlist ? (
              <Image
                alt="wishlist"
                src={`/heart-active1.png`}
                height={15}
                width={15}
                className="cursor-pointer hover:scale-110 transition-all duration-200"
              />
            ) : (
              <Image
                src={`/heart1.png`}
                alt="wishlist"
                height={15}
                width={15}
                className={`cursor-pointer transition-all duration-500 hover:scale-110`}
              />
            )}
          </div>
        </div>
      </div>
      <div className={`mt-auto pt-3 !text-left`}>
        <Prices
          price={product?.price}
          inventory={product?.inventory}
          is_details={is_details}
        />
      </div>
    </div>
  );
};
