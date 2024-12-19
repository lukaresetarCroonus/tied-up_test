import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalAddToCart } from "@/app/api/globals";
import { useGlobalRemoveFromCart } from "@/app/api/globals";
import { currencyFormat } from "../helpers/functions";
import PlusMinusInputOne from "./PlusMinusInputOne";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Link from "next/link";
import cancel from "@/assets/Icons/cancel.png";

const CartProductItem = ({ item }) => {
  const [productAmount, setProductAmount] = useState(
    Number(item.cart.quantity)
  );
  const removeFromCart = useGlobalRemoveFromCart();

  const addToCart = useGlobalAddToCart(true);

  useEffect(() => {
    if (productAmount != item.cart.quantity) {
      addToCart(item?.product?.id, productAmount, true);
    }
  }, [productAmount, addToCart, item.cart.quantity, item?.product?.id]);

  const per_item = item?.product?.price?.per_item;
  const total = item?.product?.price?.cost;
  const currency = item?.product?.price?.currency;
  const [sureCheck, setSureCheck] = useState(false);
  return (
    <>
      <div className="col-span-2 grid grid-cols-4 gap-x-4 md:gap-x-10 mt-1 relative">
        <div className="relative max-md:col-span-2 col-span-1 w-full flex items-center">
          <div className="relative">
            <Link href={`/${item?.product?.link?.link_path}`}>
              <Image
                src={convertHttpToHttps(item?.product?.image[0])}
                width={0}
                height={0}
                sizes={`100vw`}
                alt=""
                className="w-full h-auto"
              />
            </Link>
            {item?.product?.price?.per_item?.discount?.active && (
              <div
                className={`absolute top-2 right-2 bg-[#215352] px-[0.85rem] py-0.5 rounded-lg font-normal text-xs text-white`}
              >
                -
                {(
                  ((item?.product?.price?.per_item?.price_with_vat -
                    item?.product?.price?.per_item?.price_discount) /
                    item?.product?.price?.per_item?.price_with_vat) *
                  100
                ).toFixed(0)}
                %
              </div>
            )}
          </div>
        </div>
        <div className={`col-span-2 flex flex-col relative`}>
          <span
            className="absolute -top-5 right-2 md:-right-6 cursor-pointer text-lg"
            onClick={() => setSureCheck(true)}
          >
            <Image src={cancel} width={20} height={20} alt="Tied up" />
          </span>
          <Link href={`/${item?.product?.link?.link_path}`}>
            <span className="text-sm md:text-[18px] block font-bold">
              {item?.product?.basic_data?.name}
            </span>
          </Link>
          <div className="flex flex-col font-light">
            <span className="mt-5">
              Šifra: {item?.product?.basic_data?.sku}
            </span>
            <div className="flex items-center gap-3 max-md:hidden">
              <span className={`font-light`}>Količina</span>
              <PlusMinusInputOne
                setCount={setProductAmount}
                count={productAmount}
                amount={productAmount}
                maxAmount={+item?.product?.inventory?.amount}
              />
            </div>
            <div className="flex items-center gap-3 md:hidden">
              <span>Količina:</span>
              {productAmount}
            </div>
            <span>Ukupan iznos: {currencyFormat(total?.total, currency)}</span>
            {item?.product?.price?.per_item?.discount?.active && (
              <span className="font-semibold text-[#215352]">
                Uštedeli ste:{" "}
                {currencyFormat(
                  item?.product?.price?.cost?.discount_amount,
                  currency
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      {sureCheck && (
        <div
          className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setSureCheck(false)}
        >
          <div className="bg-white p-5 rounded-lg">
            <span className="text-[15px] font-bold">
              Da li ste sigurni da želite da uklonite proizvod iz korpe?
            </span>
            <div className="flex items-center gap-4 justify-center mt-5">
              <button
                className="bg-[#E5E5E5] hover:bg-red-500 hover:text-white px-5 py-2 rounded-lg"
                onClick={() => setSureCheck(false)}
              >
                Ne
              </button>
              <button
                className="bg-[#E5E5E5] hover:bg-green-500 hover:text-white px-5 py-2 rounded-lg"
                onClick={() => removeFromCart(item?.product?.id)}
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

export default CartProductItem;
