"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Aos from "aos";
import { useIsMobile } from "@/hooks/croonus.hooks";

const IndexSlider = ({ banners, mobileBanners }) => {
  const is_mobile = useIsMobile();

  const [currentSlide, setCurrentSlide] = useState({
    index: 0,
    banner: is_mobile ? mobileBanners?.[0]?.image : banners[0]?.image,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartIndex, setDragStartIndex] = useState(0);
  const [draggingIndex, setDraggingIndex] = useState(0);
  const sliderRef = useRef();

  useEffect(() => {
    let banner = is_mobile ? mobileBanners : banners;

    const handleMouseUp = () => {
      if (isDragging) {
        setCurrentSlide({
          index: draggingIndex,
          banner: banner?.[draggingIndex]?.image,
        });
        setIsDragging(false);
      }
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        let banner = is_mobile ? mobileBanners : banners;
        event.preventDefault();
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const slideWidth = sliderRect.width / banner.length;
        const mouseX = event.clientX - sliderRect.left;
        let newIndex = Math.floor(mouseX / slideWidth);
        if (newIndex < 0) newIndex = 0;
        if (newIndex > banner.length - 1) newIndex = banner.length - 1;
        setDraggingIndex(newIndex);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, draggingIndex, banners, mobileBanners]);

  const handleSlideChange = (index) => {
    setCurrentSlide({
      index: index,
      banner: is_mobile
        ? mobileBanners?.[index]?.image
        : banners?.[index]?.image,
    });
  };

  const handleMouseDown = (event, index) => {
    event.preventDefault();
    setDragStartIndex(index);
    setDraggingIndex(index);
    setIsDragging(true);
  };
  useEffect(() => {
    Aos.init();
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    let banner = is_mobile ? mobileBanners : banners;

    const nextSlide = () => {
      setCurrentSlide((prevState) => {
        const nextIndex = (prevState.index + 1) % banner?.length;
        return {
          index: nextIndex,
          banner: banner?.[nextIndex]?.image,
        };
      });
    };
    intervalRef.current = setInterval(nextSlide, 5000);
    const handleInteraction = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(nextSlide, 5000);
    };
    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [banners, mobileBanners]);

  return (
    <div className="w-screen block" ref={sliderRef}>
      <div className="relative h-full overflow-hidden">
        <div className="items-center justify-between h-full w-full">
          {(is_mobile ? mobileBanners : banners ?? [])?.map((banner, index) => {
            const isActive = currentSlide?.index === index;

            return (
              <div
                key={index}
                className={
                  isActive
                    ? "relative w-full overflow-hidden h-full opacity-100 duration-[1000ms] transition-all ease-linear"
                    : "absolute w-full h-full overflow-hidden opacity-0 duration-[1000ms] transition-all ease-linear"
                }
              >
                <div className="relative sm:h-full">
                  <Image
                    src={banner?.image}
                    alt={banner?.title}
                    width={0}
                    height={0}
                    sizes={`100vw`}
                    className="w-full h-auto"
                  />
                  <Link
                    href={`${banner?.url ?? `/stranica-u-izradi`}`}
                    target={`${banner?.target}` ?? "_self"}
                    className="absolute z-[49] top-0 left-0 w-full h-full bg-black transition-all duration-500 bg-opacity-20"
                  >
                    <div className="absolute flex flex-col items-center md:items-start justify-center md:justify-start max-sm:gap-[20px] gap-[10px] max-sm:top-[50%] top-[48%] text-center max-md:mx-2 md:left-[8%] transform -translate-y-1/2">
                      {banner?.title && (
                        <h1 className="text-white max-sm:text-base text-xl font-normal">
                          {banner?.title}
                        </h1>
                      )}
                      {banner?.subtitle && (
                        <h2 className="text-white max-sm:text-xl text-[42px] font-semibold tracking-wider">
                          {banner?.subtitle}
                        </h2>
                      )}
                      {banner?.text && (
                        <p className="text-white md:text-left sm:max-w-[60%] max-sm:text-[0.925rem] text-base font-normal">
                          {banner?.text}
                        </p>
                      )}
                      {banner?.button && (
                        <button className="bg-transparent  hover:bg-white hover:text-black transition-all duration-300  text-white text-sm font-bold uppercase py-4 px-12 max-sm:px-2 max-sm:py-2 max-sm:flex max-sm:items-center max-sm:justify-center border border-white max-sm:w-[250px] mt-2">
                          {banner?.button}
                        </button>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative max-sm:hidden">
        <div className="absolute max-sm:-top-[1rem] md:-top-[2rem] xl:-top-[2rem] 2xl:-top-20  w-full flex items-center justify-center z-[50]">
          {banners?.map((banner, index) => (
            <div
              key={index}
              className={`${
                currentSlide?.index === index ? "bganimate" : "bg-white"
              } w-32 h-[3.5px]  mx-1 cursor-pointer`}
              onClick={() => handleSlideChange(index)}
            ></div>
          ))}

          {banners?.map((banner, index) => (
            <div
              key={index}
              className="absolute flex gap-10 items-center bottom-6"
            >
              <i
                className="cursor-pointer fas fa-chevron-left text-white text-sm"
                onClick={
                  currentSlide?.index === 0
                    ? () => handleSlideChange(banners.length - 1)
                    : () => handleSlideChange(currentSlide?.index - 1)
                }
              ></i>
              <div>
                <p className="text-white">{`${currentSlide?.index + 1} / ${
                  banners?.length
                }`}</p>
              </div>
              <i
                className="fas cursor-pointer fa-chevron-right text-white text-sm"
                onClick={
                  currentSlide?.index === banners.length - 1
                    ? () => handleSlideChange(0)
                    : () => handleSlideChange(currentSlide?.index + 1)
                }
              ></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexSlider;
