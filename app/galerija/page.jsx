import Link from "next/link";
import Image from "next/image";

const Galerija = () => {
  return (
    <>
      <div className="flex flex-col mt-5 md:mt-16 items-center relative">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-opacity-50 text-center">
          <p className={`font-bold text-3xl text-[#df6a25] xl:text-[120px]`}>
            USKORO...
          </p>
          <p className="font-light text-[1.5rem] xl:text-[30px]">
            Izvinite, stranica je trenutno u izradi.
          </p>
          <Link
            href="/"
            className="rounded-md shadow-md border mt-10 px-10 font-medium  hover:bg-opacity-80 py-4"
          >
            Idite na početnu
          </Link>
        </div>
      </div>
    </>
  );
};

export default Galerija;

export const metadata = {
  title: "Galerija | TiedUp",
  description: "Galerija",
};
