"use client";

import Image from "next/image";
import {
  useAddToCart,
  useDebounce,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/hooks/croonus.hooks";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/helpers/functions";
import PlusMinusInput from "@/components/PlusMinusInputOne";
import Link from "next/link";
import { pushToDataLayer } from "@/_services/data-layer";

const CheckoutItems = ({
  id,
  name,
  sku,
  price,
  image,
  slug_path,
  inventory,
  className,
  key,
  refreshCart,
  quantity,
  refreshSummary,
  isClosed,
  cart_item_id,
}) => {
  const { mutate: removeFromCart, isSuccess: isRemoved } = useRemoveFromCart();
  const { mutate: updateCart, isSuccess: isUpdated } = useUpdateCartQuantity();

  const [productQuantity, setProductQuantity] = useState(Number(quantity));

  useEffect(() => {
    setProductQuantity(Number(quantity));
  }, [quantity]);

  useEffect(() => {
    if (isUpdated || isRemoved) {
      refreshCart();
      refreshSummary();
    }
  }, [isUpdated, isRemoved]);

  const [sureCheck, setSureCheck] = useState(false);

  return (
    <>
      <div key={key} className={`relative grid grid-cols-4 gap-5`}>
        <i
          className={`fas fa-times absolute right-2 top-2 z-10 cursor-pointer ${
            isClosed && !inventory?.inventory_defined && "text-white"
          } text-lg hover:text-red-500`}
          onClick={() => {
            setSureCheck(true);
          }}
        ></i>
        <Link href={`/${slug_path}`} className={`col-span-1`}>
          <Image
            src={image?.[0] ?? "/comr.png"}
            alt={`tiedUp`}
            width={0}
            height={0}
            sizes={`90vw`}
            className={`!h-auto !w-full`}
          />
        </Link>
        <div
          className={`col-span-3 mb-auto ml-[2rem] flex flex-col items-start gap-2`}
        >
          <Link
            href={`/${slug_path}`}
            className={`${className} mt-2 text-left max-w-[80%] mr-auto text-[1.1rem] font-normal`}
          >
            {name}
          </Link>
          <div className={`flex items-center`}>
            <span className={`${className} text-[0.9rem]`}>Količina:</span>{" "}
            &nbsp;
            <PlusMinusInput
              id={cart_item_id}
              maxAmount={+inventory?.amount}
              quantity={productQuantity}
              updateCart={updateCart}
              setCount={setProductQuantity}
              count={productQuantity}
              setQuantity={setProductQuantity}
            />
          </div>
          <p className={`text-center ${className} text-[0.9rem] font-normal`}>
            Šifra:&nbsp;{sku}
          </p>
          <p className={`text-center ${className} text-[0.9rem] font-normal`}>
            Ukupan iznos:&nbsp;{currencyFormat(price?.per_item?.total)}
          </p>
        </div>
        {isClosed && !inventory?.inventory_defined && (
          <div
            className={`absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black/40`}
          ></div>
        )}
      </div>
      {sureCheck && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSureCheck(false)}
        >
          <div className="rounded-lg bg-white p-5">
            <span className="text-[15px] font-bold">
              Da li ste sigurni da želite da uklonite proizvod iz korpe?
            </span>
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                className="rounded-lg bg-[#E5E5E5] px-5 py-2 hover:bg-red-500 hover:text-white max-md:text-[15px]"
                onClick={() => setSureCheck(false)}
              >
                Ne
              </button>
              <button
                className="rounded-lg bg-[#E5E5E5] px-5 py-2 hover:bg-[#b89980] hover:text-white max-md:text-[15px]"
                onClick={() => {
                  removeFromCart({ id: id });
                  pushToDataLayer("remove_from_cart", {
                    price: price,
                    id: id,
                    name: name,
                    brand_name: "Tied Up",
                    productQuantity: productQuantity,
                  });
                }}
              >
                Da
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutItems;
