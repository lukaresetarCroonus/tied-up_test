"use client";
import Variants from "../Variants/Variants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/helpers/functions";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "../../assets/Icons/heart.png";
import DeliveryStatus from "../../assets/Icons/delivery-status.png";
import Calendar from "../../assets/Icons/calendar.png";
import FreeDelivery from "../../assets/Icons/package.png";
import Cancel from "../../assets/Icons/cancel.png";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import Link from "next/link";
import CampaignsDetails from "../ProductDetails/CampaignsDetails";
import { get } from "@/app/api/api";
import WishlistActive from "@/assets/Icons/heart-active.png";
import PlusMinusInputTwo from "../PlusMinusInputTwo";
import {
  useAddToCart,
  useAddToWishlist,
  useIsInWishlist,
  useRemoveFromWishlist,
} from "@/hooks/croonus.hooks";
import {
  checkIsInStock,
  checkPrices,
  Prices,
} from "@/_components/shared/prices";

const ProductInfo = ({
  product,
  desc,
  path,
  isNewURL,
  setIsNewURL,
  setVariantKey,
  variantKey,
  setColor,
  breadcrumbs,
  specification,
  declaration,
}) => {
  const [productVariant, setProductVariant] = useState(null);
  const [count, setCount] = useState(1);

  const campaignsDate =
    product?.data?.item?.price?.discount?.campaigns[0]?.duration;

  const router = useRouter();
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  const [newURL, setNewURL] = useState(null);

  useEffect(() => {
    if (newURL) {
      window?.history?.replaceState(null, null, newURL);
    }
  }, [newURL]);

  //azuriramo varijantu
  const updateProductVariant = (variant) => {
    setProductVariant({
      ...variant,
      price: {
        ...variant?.price,
        min: [],
        max: [],
      },
    });
  };

  const handleURLChange = (newURL) => {
    setNewURL(newURL);
  };

  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (selectedColor !== null) {
      setColor(selectedColor);
    }
  }, [selectedColor]);

  const [productAmount, setProductAmount] = useState(1);

  const [setVariant, setVariantOnOff] = useState(true);

  const { mutate: addToCart, isPending } = useAddToCart();
  const { mutate: addToWishlist, isSuccess: is_added } = useAddToWishlist();
  const { data: is_in_wishlist, refetch } = useIsInWishlist({
    id: product?.data?.item?.basic_data?.id_product,
  });
  const { mutate: removeFromWishlist, isSuccess: is_removed } =
    useRemoveFromWishlist();

  const isInWishlist = is_in_wishlist?.exist;
  const wishlist_item_id = is_in_wishlist?.wishlist_item_id;

  useEffect(() => {
    if (is_removed || is_added) {
      refetch();
    }
  }, [is_added, is_removed]);

  const checkIsAddable = (price, inventory) => {
    let addable_data = {};

    let is_in_stock = checkIsInStock(inventory);
    let { price_defined } = checkPrices(price);
    if (is_in_stock && price_defined) {
      addable_data.addable = true;
      addable_data.text = "DODAJ U KORPU";
    } else {
      addable_data.addable = false;
      addable_data.text = "POŠALJI UPIT";
    }

    return addable_data;
  };
  //hendlujemo dodavanje u korpu
  const handleAddToCart = () => {
    switch (product?.product_type) {
      case "single":
        let is_addable = checkIsAddable(
          product?.data?.item?.price,
          product?.data?.item?.inventory
        );
        if (is_addable?.addable) {
          addToCart({
            id: product?.data?.item?.basic_data?.id_product,
            quantity: count,
          });
        } else {
          router.push(`/kontakt?slug=${product?.data?.item?.slug}`);
        }
        break;
      case "variant":
        if (productVariant?.id) {
          let is_addable = checkIsAddable(
            productVariant?.price,
            productVariant?.inventory
          );

          if (is_addable?.addable) {
            addToCart({
              id: productVariant?.id,
              quantity: count,
            });
          } else {
            router.push(`/kontakt?slug=${productVariant?.slug}`);
          }
        }
        break;
      default:
        break;
    }
  };

  const [deliveryModal, setDeliveryModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [returnModal, setReturnModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleBodyScroll = () => {
      if (deliveryModal || infoModal || returnModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };
    handleBodyScroll();
  }, [deliveryModal, infoModal, returnModal]);

  const [text, setText] = useState("Dodaj u korpu");

  const handleTextChangeAddToCart = () => {
    if (product?.product_type === "variant" && !productVariant?.id) {
      setText("Izaberite veličinu");
    }
  };

  useEffect(() => {
    if (product?.product_type === "variant" && productVariant?.id) {
      setText("Dodaj u korpu");
    }
  }, [productVariant]);
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      {product ? (
        <>
          <div className="col-span-4 mt-[2rem]">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/`}
                className="text-[#191919] text-[0.75rem] font-normal hover:text-[#215352]"
              >
                Početna
              </Link>{" "}
              <i className="fas fa-chevron-right text-[#191919] text-[0.65rem]"></i>
              {breadcrumbs?.steps?.map((breadcrumb, index, arr) => {
                return (
                  <div className="flex items-center gap-2">
                    <Link
                      href={
                        index === arr.length - 1
                          ? `/${breadcrumb?.link?.link_path}`
                          : `/${breadcrumb?.link?.link_path}`
                      }
                      className="text-[#191919] text-[0.75rem] font-normal hover:text-[#215352]"
                    >
                      {breadcrumb?.name}
                    </Link>
                    {index !== arr.length - 1 && (
                      <i className="fas fa-chevron-right text-[#191919] text-[0.65rem]"></i>
                    )}
                  </div>
                );
              })}
              <i className="fas fa-chevron-right text-[#191919] text-[0.65rem]"></i>
              <h1 className="text-[0.75rem] font-normal text-[#215352]">
                {breadcrumbs?.end?.name}
              </h1>
            </div>
            <div className="flex flex-col ">
              <h1 className="text-[1.563rem] max-md:text-[1.1rem] font-bold">
                {product?.data?.item?.basic_data?.name}
              </h1>
              <h2 className="mt-[1.063rem] text-[#636363] text-[0.688rem]">
                Šifra:&nbsp;
                {productVariant?.id
                  ? productVariant?.basic_data?.sku
                  : product?.data?.item?.basic_data?.sku}
              </h2>
              {productVariant?.id ? (
                <>
                  {!productVariant?.inventory?.inventory_defined && (
                    <>
                      <p
                        className={`text-[#215352] w-fit text-sm font-bold mt-5`}
                      >
                        Proizvod nije dostupan.
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  {!product?.data?.item?.inventory?.inventory_defined && (
                    <>
                      <p
                        className={`text-[#215352] w-fit text-sm font-bold mt-5`}
                      >
                        Proizvod nije dostupan.
                      </p>
                    </>
                  )}
                </>
              )}
              <div
                className={`mt-[2.125rem] text-[1.313rem] flex items-center gap-3 font-bold`}
              >
                <Prices
                  price={
                    productVariant?.id
                      ? productVariant?.price
                      : product?.data?.item?.price
                  }
                  inventory={
                    productVariant?.id
                      ? productVariant?.inventory
                      : product?.data?.item?.inventory
                  }
                />
                {product?.data?.item?.price?.discount?.active && (
                  <span className="text-[#636363] text-[1rem] line-through">
                    {currencyFormat(
                      product?.data?.item?.price?.price?.original
                    )}
                  </span>
                )}
              </div>
              {product?.data?.item?.price?.discount?.active && (
                <div className="mt-3">
                  <h2 className="text-[17px] text-[#b89980] font-semibold">
                    Ušteda:{" "}
                    {currencyFormat(
                      product?.data?.item?.price?.discount?.amount
                    )}
                  </h2>
                </div>
              )}
              {product?.data?.item?.inventory?.amount >= 2 &&
                product?.data?.item?.inventory?.amount <= 4 && (
                  <>
                    <p
                      className={`text-[#215352] w-fit text-sm font-bold mt-5`}
                    >
                      Male količine
                    </p>
                  </>
                )}
              {product?.data?.item?.price?.discount?.campaigns?.length > 0 && (
                <CampaignsDetails campaignsDate={campaignsDate} />
              )}
              <p
                className="mt-[2.438rem] max-md:mt-[1.5rem] max-w-[90%] text-sm font-regular"
                dangerouslySetInnerHTML={{ __html: desc?.description }}
              ></p>
            </div>
            {product?.product_type === "variant" && (
              <div className="py-[2.75rem] max-md:py-[1.5rem]">
                <Variants
                  firstVariantOption={productVariant ? false : true}
                  product={product}
                  productSlug={path}
                  handleURLChange={handleURLChange}
                  updateProductVariant={updateProductVariant}
                  setSelectedColor={setSelectedColor}
                  productVariant={productVariant}
                  setVariant={false}
                  setVariantOnOff={setVariantOnOff}
                  slug={path}
                />
              </div>
            )}
            {/* <button className="flex items-center gap-2">
              <Image
                src={"/icons/measure.png"}
                alt="measure"
                width={30}
                height={20}
              />
              <span
                onClick={() => setOpenModal(!openModal)}
                className="text-[13px] font-bold"
              >
                Pomoć za veličine
              </span>
            </button> */}
            <div className="mt-[4.188rem] max-md:mt-[2rem] flex items-center gap-3">
              <PlusMinusInputTwo setCount={setCount} amount={count} />
              <button
                disabled={
                  productVariant?.id
                    ? !productVariant?.inventory?.inventory_defined
                    : !product?.data?.item?.inventory?.inventory_defined
                }
                className={
                  productVariant === null || productVariant.length === 0
                    ? `max-sm:w-[8.5rem] ${
                        text === "Izaberite veličinu" ||
                        text === "Izaberite boju"
                          ? `bg-red-500`
                          : `bg-[#215352]`
                      } sm:w-[15.313rem] hover:bg-opacity-80 h-[54px]  flex justify-center items-center uppercase text-white text-lg font-semibold pt-1 relative`
                    : `max-sm:w-[8.5rem] ${
                        text === "Izaberite veličinu" ||
                        text === "Izaberite boju"
                          ? `bg-red-500`
                          : `bg-[#215352]`
                      } sm:w-[15.313rem] hover:bg-opacity-80 h-[54px] flex justify-center items-center uppercase text-white text-lg font-semibold pt-1`
                }
                onClick={() => {
                  handleAddToCart();
                  handleTextChangeAddToCart();
                }}
              >
                {isPending
                  ? "DODAJEM.."
                  : checkIsAddable(
                      productVariant?.id
                        ? productVariant?.price
                        : product?.data?.item?.price,
                      productVariant?.id
                        ? productVariant?.inventory
                        : product?.data?.item?.inventory
                    ).text}
              </button>

              <div
                className="w-[39px] h-[35px] cursor-pointer"
                onClick={() => {
                  if (!isInWishlist) {
                    addToWishlist({
                      id: product?.data?.item?.basic_data?.id_product,
                    });
                  } else {
                    removeFromWishlist({ id: wishlist_item_id });
                  }
                }}
              >
                <Image
                  src={isInWishlist ? WishlistActive : Wishlist}
                  alt="wishlist"
                  width={39}
                  height={35}
                  className="h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-[3.2rem] max-md:mt-[2rem] max-md:flex ml-2 max-md:w-full">
              <ul className="flex flex-row gap-[47px] text-[16px] font-semibold relative separate">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setDeliveryModal(true)}
                >
                  Opis
                </div>
                <div
                  className="relative cursor-pointer"
                  onClick={() => setInfoModal(true)}
                >
                  Informacije
                </div>
              </ul>
            </div>
          </div>
          <div
            className={
              deliveryModal
                ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
                : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
            }
          >
            <div
              className={`
          
              bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col md:w-[890px] md:h-[490px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Dostava</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setDeliveryModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="font-light text-[15px]">
                  Mesto isporuke poruče ne robe mora se nalaziti na teritoriji
                  Republike Srbije. Isporuku proizvoda poručenih na sajtu
                  croonus.com vrši kurirska služba „YU – PD Express“ d.o.o .
                  Beograd – D Express, na teritoriji Republike Srbije, radnim
                  danima u periodu od 8 do 16h, na adresu primaoca pošiljke.
                </p>
                <p className="font-light mt-[30px] text-[15px]">
                  U slučaju da je na porudžbenici više artikala, velika je
                  verovatnoće da nemamo sve artikle na jednom mestu, zbog čega
                  ćete porudžbinu dobiti u više pošiljki. Nakon obrade
                  porudžbine, na vašu e-mail adresu stići će obaveštenje o
                  statusu porudžbine.
                </p>
                <p className="font-light mt-[30px] text-[15px]">
                  Po Zakonu o zaštiti potrošača, član 32 – Trgovac je dužan da u
                  roku od 30 dana od dana zaključenja ugovora na daljinu i
                  ugovora koji se zaključuje izvan poslovnih prostorija izvrši
                  isporuku robe. Okvirni rok isporuke je do 3 radna dana. Rok
                  isporuke može biti i duži od navedenog (3 radna dana), u
                  vanrednim slučajevima poput velikih gužvi, pandemija,
                  neprohodnosti puteva u slučaju vremenskih nepogoda i sl.
                  Kurirska služba je u obavezi da isporuku vrši što efikasnije u
                  skladu sa svojim mogućnostima i poslovnim kapacitetima.
                </p>
              </div>
            </div>
          </div>
          {(deliveryModal || infoModal || returnModal || openModal) && (
            <div
              className="fixed z-[100] bg-black bg-opacity-40 top-0 left-0 w-screen h-screen transition-all duration-500"
              onClick={() => {
                setDeliveryModal(false);
                setInfoModal(false);
                setReturnModal(false);
                setOpenModal(false);
              }}
            ></div>
          )}
        </>
      ) : (
        notFound()
      )}
      <div
        className={
          openModal
            ? `border-l translate-x-0 fixed top-0 right-0 bg-white transition-all duration-500 z-[1000000000000000000] h-screen w-full`
            : `border-l translate-x-full fixed top-0 right-0 bg-white transition-all duration-500 z-[1000000000000000000] h-screen w-full`
        }
      >
        <i
          className={`fas ml-auto p-2 text-lg fa-times cursor-pointer`}
          onClick={() => setOpenModal(false)}
        ></i>
        <div className={`p-1 overflow-y-auto h-full mt-5`}>
          <h2 className={`text-[1.2rem] w-full pb-2 border-b`}>
            Tabele mera za žene (gornji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>XS</th>
                  <th className={`text-left`}>S</th>
                  <th className={`text-left`}>M</th>
                  <th className={`text-left`}>L</th>
                  <th className={`text-left`}>XL</th>
                  <th className={`text-left`}>XXL</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 px-2 font-bold`}>
                    Obim grudi
                  </td>
                  <td className={`text-left`}>80-84</td>
                  <td className={`text-left`}>84-88</td>
                  <td className={`text-left`}>88-92</td>
                  <td className={`text-left`}>92-96</td>
                  <td className={`text-left`}>89-102</td>
                  <td className={`text-left`}>102-106</td>
                </tr>
                <tr className={`border-b !py-2`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>60-64</td>
                  <td className={`text-left`}>64-68</td>
                  <td className={`text-left`}>68-72</td>
                  <td className={`text-left`}>72-76</td>
                  <td className={`text-left`}>78-82</td>
                  <td className={`text-left`}>82-86</td>
                </tr>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left px-2 py-2 font-bold`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>88-92</td>
                  <td className={`text-left`}>92-96</td>
                  <td className={`text-left`}>96-100</td>
                  <td className={`text-left`}>100-104</td>
                  <td className={`text-left`}>106-110</td>
                  <td className={`text-left`}>110-114</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={`text-[1.2rem] mt-10 w-full pb-2 border-b`}>
            Tabele mera za žene (donji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>27</th>
                  <th className={`text-left`}>28</th>
                  <th className={`text-left`}>29</th>
                  <th className={`text-left`}>30</th>
                  <th className={`text-left`}>31</th>
                  <th className={`text-left`}>32</th>
                  <th className={`text-left`}>33</th>
                  <th className={`text-left`}>34</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>62-65</td>
                  <td className={`text-left`}>65-68</td>
                  <td className={`text-left`}>68-72</td>
                  <td className={`text-left`}>72-74</td>
                  <td className={`text-left`}>74-78</td>
                  <td className={`text-left`}>78-82</td>
                  <td className={`text-left`}>82-28</td>
                  <td className={`text-left`}>68-92</td>
                </tr>
                <tr className={`border-b !py-2`}>
                  <td className={`text-left py-2 pl-2 font-bold`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>90-93</td>
                  <td className={`text-left`}>93-96</td>
                  <td className={`text-left`}>96-99</td>
                  <td className={`text-left`}>99-102</td>
                  <td className={`text-left`}>102-106</td>
                  <td className={`text-left`}>105-110</td>
                  <td className={`text-left`}>110-114</td>
                  <td className={`text-left`}>114-118</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={`text-[1.2rem] mt-10 w-full pb-2 border-b`}>
            Tabele mera za muškarce (gornji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>S</th>
                  <th className={`text-left`}>M</th>
                  <th className={`text-left`}>L</th>
                  <th className={`text-left`}>XL</th>
                  <th className={`text-left`}>2XL</th>
                  <th className={`text-left`}>3XL</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim grudi
                  </td>
                  <td className={`text-left`}>96-100</td>
                  <td className={`text-left`}>100-104</td>
                  <td className={`text-left`}>104-108</td>
                  <td className={`text-left`}>110-114</td>
                  <td className={`text-left`}>114-118</td>
                  <td className={`text-left`}>118-112</td>
                </tr>
                <tr className={`border-b !py-2`}>
                  <td className={`text-left py-2 pl-2 font-bold`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>80-84</td>
                  <td className={`text-left`}>84-88</td>
                  <td className={`text-left`}>88-92</td>
                  <td className={`text-left`}>94-98</td>
                  <td className={`text-left`}>98-102</td>
                  <td className={`text-left`}>102-104</td>
                </tr>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>98-102</td>
                  <td className={`text-left`}>102-106</td>
                  <td className={`text-left`}>106-110</td>
                  <td className={`text-left`}>112-116</td>
                  <td className={`text-left`}>116-120</td>
                  <td className={`text-left`}>120-124</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={`text-[1.2rem] mt-10 w-full pb-2 border-b`}>
            Tabele mera za muškarce (donji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>30</th>
                  <th className={`text-left`}>31</th>
                  <th className={`text-left`}>32</th>
                  <th className={`text-left`}>33</th>
                  <th className={`text-left`}>34</th>
                  <th className={`text-left`}>36</th>
                  <th className={`text-left`}>38</th>
                  <th className={`text-left`}>40</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>78-81</td>
                  <td className={`text-left`}>81-84</td>
                  <td className={`text-left`}>84-87</td>
                  <td className={`text-left`}>87-90</td>
                  <td className={`text-left`}>90-94</td>
                  <td className={`text-left`}>94-98</td>
                  <td className={`text-left`}>98-102</td>
                  <td className={`text-left`}>102-106</td>
                </tr>

                <tr className={`border-b !py-2`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>96-99</td>
                  <td className={`text-left`}>99-102</td>
                  <td className={`text-left`}>102-105</td>
                  <td className={`text-left`}>105-108</td>
                  <td className={`text-left`}>108-112</td>
                  <td className={`text-left`}>112-116</td>
                  <td className={`text-left`}>116-120</td>
                  <td className={`text-left`}>120-124</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
