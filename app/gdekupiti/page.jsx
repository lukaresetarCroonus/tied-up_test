import Link from "next/link";
import Image from "next/image";

const Gdekupiti = () => {
  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>Gde kupiti</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          Gde kupiti
        </h1>
      </div>
      <div className="flex flex-col mt-5 md:mt-16 items-center relative">
        <div className="w-[95%] mx-auto lg:w-full lg:px-[3rem]">
          <h3 className="font-semibold text-[22px]">
            {" "}
            Gde kupiti Tied up proizvode?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-[2rem]">
            <Link
              href="https://www.google.com/maps/place/%D0%9F%D1%80%D0%B2%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D0%B0+%D0%A1%D1%82%D0%BE%D1%98%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%9B%D0%B0+4,+%D0%9A%D1%80%D0%B0%D0%B3%D1%83%D1%98%D0%B5%D0%B2%D0%B0%D1%86+34000/@44.0124768,20.8924056,17z/data=!3m1!4b1!4m6!3m5!1s0x47572115804e7d6f:0xbe77b961c372b35!8m2!3d44.0124768!4d20.8949805!16s%2Fg%2F11j24w2mxp?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
            >
              <div className={`col-span-1`}>
                <div className="overflow-hidden rounded-[20px]">
                  <Image
                    src={`/store1.jpg`}
                    alt=""
                    width={400}
                    height={400}
                    className="rounded-[20px] w-full transition-all duration-500 hover:!scale-110"
                  />
                </div>
                <h5 className="text-center mt-5 text-[20px] hover:underline">
                  Kragujevac - TiedUp
                </h5>
                <p className="text-center font-light hover:underline">
                  Prvoslava Stojanovića 4, Kragujevac
                </p>
              </div>
            </Link>
            <Link
              href="https://www.google.com/maps/place/%D0%9A%D0%BD%D0%B5%D0%B7%D0%B0+%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%B0+6,+%D0%91%D0%B5%D0%BE%D0%B3%D1%80%D0%B0%D0%B4+11000/@44.8154337,20.4571944,17z/data=!3m1!4b1!4m6!3m5!1s0x475a7ab26947331d:0x67586e044140009b!8m2!3d44.8154337!4d20.4597693!16s%2Fg%2F11d_d2cx_v?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
            >
              <div className="col-span-1">
                <div className="overflow-hidden rounded-[20px]">
                  <Image
                    src={`/store2.jpg`}
                    alt=""
                    width={400}
                    height={400}
                    className="rounded-[20px] w-full transition-all duration-500 hover:!scale-110"
                  />
                </div>
                <h5 className="text-center mt-5 text-[20px] hover:underline">
                  Hand made festival - Beograd
                </h5>
                <p className="text-center font-light hover:underline">
                  Knez Mihailova 36, Beograd
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gdekupiti;
export const metadata = {
  title: "Gde kupiti | TiedUp",
  description: "Gde kupiti",
};
