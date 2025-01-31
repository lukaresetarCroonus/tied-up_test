import Link from "next/link";
import Contact from "@/components/Contact/Contact";

const Kontakt = ({ searchParams: { slug } }) => {
  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>Kontakt</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          Kontakt
        </h1>
      </div>
      <Contact slug={slug} />
    </>
  );
};

export default Kontakt;

export const metadata = {
  title: "Kontakt | TiedUp",
  robots: {
    index: false,
    follow: false,
  },
};
