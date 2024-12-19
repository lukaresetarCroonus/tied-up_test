import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { currencyFormat } from "@/helpers/functions";
import { Suspense, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { icons } from "@/_lib/icons";
import { Thumb } from "@/_components/shared";

export const TemplateOne = ({
  verifyCaptcha,
  data,
  cartCost,
  recommendedProducts,
  children,
}) => {
  const [products, setProducts] = useState([]);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    let viewed_products = localStorage.getItem("tied_up_viewed_products");

    if (viewed_products) {
      viewed_products = JSON.parse(viewed_products);
      setProducts(viewed_products);
    }
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
      <div className="mx-auto text-sm 4xl:container mt-[1rem] lg:mt-[4rem] placeholder">
        <>
          <div className="grid grid-cols-5 gap-y-3 gap-x-3 max-xl:mx-auto max-xl:w-[95%] xl:mx-[5rem] ">
            <div className="col-span-5 bg-white p-1 max-xl:row-start-1">
              <div className={`flex items-center justify-between`}>
                <h2 className="text-xl font-bold ">Vaši podaci</h2>
              </div>
              {children}
            </div>
          </div>
          {products?.length > 0 && (
            <div className="max-sm:mt-[1rem] mt-[4rem] relative max-xl:mx-auto max-xl:w-[95%] xl:mx-[5rem]">
              <h2 className="text-2xl font-bold mb-10">
                Gledali ste i ove modele
              </h2>
              {products?.length > swiper?.params?.slidesPerView && (
                <div
                  onClick={() => {
                    if (swiper) {
                      swiper?.slidePrev();
                    }
                  }}
                  className={`absolute z-[5] bg-white shadow p-3 rounded-full top-1/2 border border-gray-300 left-3 transform -translate-y-1/2 cursor-pointer`}
                >
                  {icons.chevron_left}
                </div>
              )}
              <Swiper
                rewind
                slidesPerView={1.2}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                }}
                spaceBetween={20}
                onSwiper={(swiper) => setSwiper(swiper)}
              >
                {(products ?? [])?.map((item) => {
                  if (item) {
                    const { id } = item;
                    return (
                      <Suspense
                        key={`viewed-product-${id}`}
                        fallback={
                          <div
                            className={`aspect-square bg-slate-200 animate-pulse`}
                          />
                        }
                      >
                        <SwiperSlide
                          key={`viewed-slide-${id}`}
                          className={`!h-auto`}
                        >
                          <Thumb
                            id={id}
                            refreshWishlist={() => { }}
                            categoryId={"*"}
                            key={`viewed-thumb-${id}`}
                          />
                        </SwiperSlide>
                      </Suspense>
                    );
                  }
                })}
              </Swiper>
              {products?.length > swiper?.params?.slidesPerView && (
                <div
                  onClick={() => {
                    if (swiper) {
                      swiper?.slideNext();
                    }
                  }}
                  className={`absolute z-[5] bg-white shadow p-3 rounded-full top-1/2 border border-gray-300 right-3 transform -translate-y-1/2 cursor-pointer`}
                >
                  {icons.chevron_right}
                </div>
              )}
            </div>
          )}
        </>
      </div>
    </GoogleReCaptchaProvider>
  );
};
