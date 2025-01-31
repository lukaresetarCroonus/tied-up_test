"use client";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../assets/Icons/master.png";
import Image2 from "../../assets/Icons/visa.webp";
import Image3 from "../../assets/Icons/bancaIntesa.webp";
import Image4 from "../../assets/Icons/img1.webp";
import Image5 from "../../assets/Icons/img.webp";
import Image6 from "../../assets/Icons/img3.webp";
import Image7 from "../../assets/Icons/img4.webp";
import Image8 from "../../assets/Icons/american.webp";
import delivery from "@/assets/Icons/delivery-man.png";
import date from "@/assets/Icons/date.png";
import box from "@/assets/Icons/box.png";
import Instagram from "../../assets/Icons/instagram.png";
import Youtube from "../../assets/Icons/youtube.png";
import Facebook from "../../assets/Icons/facebook.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { icons } from "@/_lib/icons";

const Footer = () => {



  const [open, setOpen] = useState({
    id: null,
  });

  const pathname = usePathname();

  return (

    // ========= desktop verzija ==========
    <div className="max-md:mt-[3rem] mt-[7.75rem] bg-[#215352]">
      <div className="md:mx-[5rem] max-xl:flex-col py-[1.4rem] flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-[1px] border-b-white">
        <div
          className={`flex max-md:flex-col sm:flex-row max-md:!text-center max-xl:flex-col max-md:gap-5 max-xl:gap-[8px] max-md:mt-5 max-xl:mt-10 md:items-center mx-auto px-2 gap-[3rem] max-md:w-full max-md:justify-between `}
        >
          <div className="flex items-center justify-center gap-5 max-md:flex-col">
            <div>
              <Image
                src={delivery}
                width={45}
                height={45}
                alt="Tied up"
                className="invert"
              />
            </div>
            <div className="flex flex-col font-normal">
              <p className="text-white max-md:text-[14px] text-[18px]">
                Besplatna dostava za
              </p>
              <p className="text-white  max-md:text-[14px]  text-[18px] -mt-2">
                Iznos preko{" "}
                <span className="text-[#b89980]  max-md:text-[14px] ">
                  5.000 RSD
                </span>
              </p>
            </div>{" "}
          </div>
          <div className="flex items-center gap-5 max-md:flex-col">
            <div>
              <Image
                src={box}
                width={45}
                height={45}
                alt="Tied up"
                className="invert"
              />
            </div>
            <div className="flex flex-col font-normal">
              <p className="text-white  max-md:text-[14px]  text-[18px]">
                Povrat robe
              </p>
              <p className="text-white  max-md:text-[14px]  text-[18px] -mt-2">
                U roku od <span className="text-[#b89980]">14</span> dana
              </p>
            </div>{" "}
          </div>
          <div className="flex items-center gap-5 max-md:flex-col">
            <div>
              <Image
                src={date}
                width={45}
                height={45}
                alt="Tied up"
                className="invert"
              />
            </div>
            <div className="flex flex-col font-normal">
              <p className="text-white  max-md:text-[14px]  text-[18px]">
                Rok isporuke do
              </p>
              <p className="text-white  max-md:text-[14px]  text-[18px] -mt-2">
                <span className="text-[#b89980]">2</span> radna dana
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-8 md:mx-[5rem] border-b-2 border-b-[#b89980] pb-[1.4rem]">

        {/* === o nama i izdvajamo kontejner ==== */}
        <div className="max-md:hidden col-span-2 text-white flex flex-col justify-start mt-6">
        <div className="flex  items-start">
          {/* O nama section */}
        <div className="flex flex-col justify-start">
          <h3 className="text-[1rem] font-semibold">O nama</h3>
          <div className="flex flex-col items-start text-[17px] font-extralight mt-4">
            <p>
              <Link
                href={`/onama`}
                className={`cursor-pointer hover:text-[#b89980] ${
                  pathname === "/onama" && "text-[#b89980]"
                }`}
              >
                Više o kompaniji
              </Link>
            </p>
            <p>
              <Link
                href={`/stranica-u-izradi`}
                className={`cursor-pointer hover:text-[#b89980] ${
                  pathname === "/posao" && "text-[#b89980]"
                }`}
              >
                Ponude za posao
              </Link>
            </p>
            <p>
              <Link
                href={`/gdekupiti`}
                className={`cursor-pointer hover:text-[#b89980] ${
                  pathname === "/gdekupiti" && "text-[#b89980]"
                }`}
              >
                Prodajna mesta,
              </Link>
            </p>
            <p>
              <Link
                href={`/veleprodaja`}
                className={`cursor-pointer hover:text-[#b89980] ${
                  pathname === "/veleprodaja" && "text-[#b89980]"
                }`}
              >
                Veleprodaja
              </Link>
            </p>
          </div>
        </div>

    {/* Izdvajamo section */}
    <div className="flex flex-col justify-start ml-28">
      <h3 className="text-[1rem] font-semibold">Izdvajamo</h3>
      <div className="flex flex-col items-start text-[17px] font-extralight mt-4">
        <p>
          <Link
            href={`/kategorija-proizvoda/muskarci/kravate`}
            className={`cursor-pointer hover:text-[#b89980] ${
              pathname === "/kategorija-proizvoda/muskarci/kravate" && "text-[#b89980]"
            }`}
          >
            Kravate
          </Link>
        </p>
        <p>
          <Link
            href={`/kategorija-proizvoda/muskarci/leptir-masne`}
            className={`cursor-pointer hover:text-[#b89980] ${
              pathname === "/kategorija-proizvoda/muskarci/leptir-masne" && "text-[#b89980]"
            }`}
          >
            Leptir mašne
          </Link>
        </p>
        <p>
          <Link
            href={`/kategorija-proizvoda/muskarci/ascot-kravate`}
            className={`cursor-pointer hover:text-[#b89980] ${
              pathname === "/kategorija-proizvoda/muskarci/ascot-kravate" && "text-[#b89980]"
            }`}
          >
            Ascot kravate
          </Link>
        </p>
        <p>
          <Link
            href={`/kategorija-proizvoda/muskarci/snala-za-kravatu`}
            className={`cursor-pointer hover:text-[#b89980] ${
              pathname === "/kategorija-proizvoda/muskarci/snala-za-kravatu" && "text-[#b89980]"
            }`}
          >
            Šnala za kravatu
          </Link>
        </p>
        <p>
          <Link
            href={`/kategorija-proizvoda/premium/korporativni-pokloni`}
            className={`cursor-pointer hover:text-[#b89980] ${
              pathname === "/kategorija-proizvoda/premium/korporativni-pokloni" && "text-[#b89980]"
            }`}
          >
            Korporativni pokloni
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>

        {/* ====== pocinje centar footer-a baner, nacini placanja, social networks ======*/}
      <div className="col-span-4 flex flex-col items-center jusify-center">
            <Link href={`/`}>
              <Image
                src={"/logo1.png"}
                width={200}
                height={45}
                alt="Tied up"
                className="invert mt-4"
              />
            </Link>
            <div className="flex mt-4 gap-4">
              <a href="https://www.instagram.com/masnetiedup/" target="_blank">
                <Image
                  src={Instagram}
                  width={22}
                  height={22}
                  alt="Instagram"
                  className="hover:scale-110 transition-all duration-300 invert"
                />
              </a>
              <a href="https://www.linkedin.com/company/83116653/admin/feed/posts/" target="_blank">
                <Image
                  src="/linkedin2.png"
                  width={25}
                  height={30}
                  alt="LinkedIn"
                  className="hover:scale-110 transition-all duration-300 invert"
                />
              </a>
              <a href="https://www.facebook.com/masnetiedup/" target="_blank">
                <Image
                  src={Facebook}
                  width={22}
                  height={22}
                  alt="Facebook"
                  className="hover:scale-110 transition-all duration-300 invert"
                />
              </a>
          </div>
        
        {/* === BANK/ VISA/ MASTERCARD === */}

        <div className="flex mt-5 flex-col max-md:mt-10  gap-[1.25rem] items-center max-xl:w-full xl:max-w-[490px] 2xl:max-w-[500px] 3xl:max-w-[680px]">

                <div className="flex items-center gap-1 bg-white px-5 py-1">
                  <div>
                    <a
                      href={`http://www.mastercard.com/rs/consumer/credit-cards.html`}
                      rel={"noreferrer"}
                      target={"_blank"}
                    >
                      <Image
                        src={Image1}
                        width={50}
                        height={30}
                        alt="Master Card"
                        className="object-scale-down"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href={`https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html`}
                      rel={"noreferrer"}
                      target={"_blank"}
                    >
                      <Image
                        src={Image2}
                        width={50}
                        height={30}
                        alt="Master Card"
                        className="object-scale-down"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href={`https://www.bancaintesa.rs/`}
                      rel={"noreferrer"}
                      target={"_blank"}
                    >
                      <Image
                        src={Image3}
                        width={200}
                        height={70}
                        alt="Master Card"
                        className="object-scale-down"
                      />
                    </a>
                  </div>
                  <div>
                    <Image
                      src={Image4}
                      width={50}
                      height={30}
                      alt="Master Card"
                      className="object-scale-down"
                    />
                  </div>
                  <div>
                    <Image
                      src={Image5}
                      width={50}
                      height={30}
                      alt="Master Card"
                      className="object-scale-down"
                    />
                  </div>
                  <div>
                    <Image
                      src={Image6}
                      width={50}
                      height={30}
                      alt="Master Card"
                      className="object-scale-down"
                    />
                  </div>
                  <div>
                    <Image
                      src={Image7}
                      width={50}
                      height={30}
                      alt="Master Card"
                      className="object-scale-down"
                    />
                  </div>
                  <div>
                    <Image
                      src={Image8}
                      width={50}
                      height={30}
                      alt="Master Card"
                      className="object-scale-down"
                    />
                  </div>
                </div>
                </div>

        {/* ============================== */}
        
        <p className="mt-5 text-[12px] px-2 text-white text-center">
          Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a plaćanje se
          vrši isključivo u dinarima. Isporuka se vrši SAMO na teritoriji Republike
          Srbije. Nastojimo da budemo što precizniji u opisu proizvoda, prikazu slika
          i samih cena, ali ne možemo garantovati da su sve informacije kompletne i
          bez grešaka. Svi artikli prikazani na sajtu su deo naše ponude i ne
          podrazumeva da su dostupni u svakom trenutku.
        </p>
      </div>
        {/* ====== zavrsava se centar footer-a baner, nacini placanja ======*/}

        {/* ====== korisnicka podrska ====== */}

        <div className="max-md:hidden col-span-2 text-white flex flex-col md:justify-self-end justify-start mt-6 mr-10">
          <div className="flex  items-start">
              <div>
            <h3 className="text-[1rem] font-semibold">Korisnička podrška</h3>
            <div className="flex flex-col items-start text-[17px] font-extralight mt-4">
              <p>
                <Link
                  href={`/strana/kako-kupiti`}
                  className={`cursor-pointer hover:text-[#b89980] mr-1 ${
                    pathname === "/strana/kako-kupiti" && "text-[#b89980]"
                  }`}
                >
                  Kako kupiti,
                </Link>
                <Link
                  href={`/povrat-sredstava`}
                  className={`cursor-pointer hover:text-[#b89980] ml-1 ${
                    pathname === "/povrat-sredstava" && "text-[#b89980]"
                  }`}
                >
                  Povrat sredstava
                </Link>
              </p>
              <p>
                <Link
                  href={`/zamena-artikala`}
                  className={`cursor-pointer hover:text-[#b89980] mr-1 ${
                    pathname === "/zamena-artikala" && "text-[#b89980]"
                  }`}
                >
                  Zamena artikala
                </Link>
              </p>
              <Link
                href={`/strana/pravo-na-odustajanje`}
                className={`cursor-pointer hover:text-[#b89980] ${
                  pathname === "/strana/pravo-na-odustajanje" &&
                  "text-[#b89980]"
                }`}
              >
                Pravo na odustajanje
              </Link>
            </div>
          </div>
          </div>          
        </div>   
        {/* ================= */}
        
      </div>
{/* ============ desktop ends here ============ */}


{/* ============ mobile ============== */}

      <div className="md:hidden mx-[5rem] max-md:w-[95%] max-md:mx-auto py-5  mt-[1.75rem] max-xl:flex-col flex items-center justify-between text-[#191919]">

        <div className="flex md:hidden items-center max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-5 max-md:w-full md:gap-[100px] 2xl:gap-[150px] 3xl:gap-[220px]">

           {/* ==== izdvajamo mobile ==== */}
           <div
            onClick={() => setOpen({ id: open?.id === 3 ? null : 3 })}
            className="flex flex-col self-start gap-[40px] max-md:self-center text-center"
          >
            <div className={`flex items-center gap-3`}>
              <p className="text-[1.063rem] font-bold text-white">Izdvajamo</p>
              <span
                className={`${
                  open?.id === 3 ? "-rotate-90" : "rotate-90"
                } text-white transition-all duration-500`}
              >
                {icons.chevron_right}
              </span>
            </div>
            {open?.id === 3 && (
              <div className="flex flex-col items-center justify-center gap-[0.4rem]  font-normal text-[#c9c9c9]">
                <Link
                  href={`/kategorija-proizvoda/muskarci/kravate`}
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/kategorija-proizvoda/muskarci/kravate" && "text-[#b89980]"
                  }`}
                >
                  Kravate
                </Link>
              
                <Link
                  href={`/kategorija-proizvoda/muskarci/leptir-masne`}
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/kategorija-proizvoda/muskarci/leptir-masne" && "text-[#b89980]"
                  }`}
                >
                  Leptir mašne
                </Link>
                <Link
                  href={`/kategorija-proizvoda/muskarci/ascot-kravate`}
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/kategorija-proizvoda/muskarci/ascot-kravate" && "text-[#b89980]"
                  }`}
                >
                  Ascot kravate
                </Link>
                <Link
                  href={`/kategorija-proizvoda/muskarci/snala-za-kravatu`}
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/kategorija-proizvoda/muskarci/snala-za-kravatu" && "text-[#b89980]"
                  }`}
                >
                  Šnala za kravatu
                </Link>
                <Link
                  href={`/kategorija-proizvoda/premium/korporativni-pokloni`}
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/kategorija-proizvoda/premium/korporativni-pokloni" && "text-[#b89980]"
                  }`}
                >
                  Korporativni pokloni
                </Link>
              </div>
            )}
          </div>

          {/* =========================== */}

          {/* ====== korisnicka podrska ====== */}
          <div
            onClick={() => setOpen({ id: open?.id === 1 ? null : 1 })}
            className="flex flex-col self-start gap-[40px] max-md:self-center"
          >
            <div className={`flex items-center gap-3`}>
              <p className="text-[1.063rem] font-bold text-white">
                Korisnička podrška
              </p>
              <span
                className={`${
                  open?.id === 1 ? "-rotate-90" : "rotate-90"
                } text-white transition-all duration-500`}
              >
                {icons.chevron_right}
              </span>
            </div>
            {open?.id === 1 && (
              <div className="flex flex-col items-center justify-center gap-[0.4rem] font-normal text-[#c9c9c9]">
                <Link
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/strana/kako-kupiti" && "text-[#b89980]"
                  }`}
                  href="/strana/kako-kupiti"
                >
                  Kako kupiti
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/povrat-sredstava" && "text-[#b89980]"
                  }`}
                  href="/povrat-sredstava"
                >
                  Povrat sredstava
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/zamena-artikala" && "text-[#b89980]"
                  }`}
                  href="/zamena-artikala"
                >
                  Zamena artikala
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/strana/pravo-na-odustajanje" &&
                    "text-[#b89980]"
                  }`}
                  href="/strana/pravo-na-odustajanje"
                >
                  Pravo na odustajanje
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/strana/uslovi-koriscenja" && "text-[#b89980]"
                  }`}
                  href="/strana/uslovi-koriscenja"
                >
                  Uslovi korišćenja
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/strana/zastita-privatnosti" &&
                    "text-[#b89980]"
                  }`}
                  href="/strana/zastita-privatnosti"
                >
                  Zaštita privatnosti
                </Link>
              </div>
            )}
          </div>
          {/* =================== */}

          {/* ==== O nama ==== */}
          <div
            onClick={() => setOpen({ id: open?.id === 2 ? null : 2 })}
            className="flex flex-col self-start gap-[40px] max-md:self-center text-center"
          >
            <div className={`flex items-center gap-3`}>
              <p className="text-[1.063rem] font-bold text-white">O nama</p>
              <span
                className={`${
                  open?.id === 2 ? "-rotate-90" : "rotate-90"
                } text-white transition-all duration-500`}
              >
                {icons.chevron_right}
              </span>
            </div>
            {open?.id === 2 && (
              <div className="flex flex-col items-center justify-center gap-[0.4rem]  font-normal text-[#c9c9c9]">
                <Link
                  href={`/onama`}
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/onama" && "text-[#b89980]"
                  }`}
                >
                  Više o kompaniji
                </Link>
                <Link
                  href={`/stranica-u-izradi`}
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/posao" && "text-[#b89980]"
                  }`}
                >
                  Ponude za posao
                </Link>
                <Link
                  href={`/gdekupiti`}
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/gdekupiti" && "text-[#b89980]"
                  }`}
                >
                  Prodajna mesta,
                </Link>
                <Link
                  href={`/veleprodaja`}
                  className={`cursor-pointer hover:text-[#b89980] ${
                    pathname === "/veleprodaja" && "text-[#b89980]"
                  }`}
                >
                  Veleprodaja
                </Link>
              </div>
            )}
          </div>
          
          {/* =================== */}
         
        </div>
      </div>
      <div className="mx-[5rem] max-md:flex-col max-md:gap-10 max-md:w-[95%] max-md:mx-auto py-[1rem] flex items-center justify-between text-white">
        <div className=" max-md:hidden flex max-md:flex-wrap items-center gap-3 4xl:gap-6">
          <Link
            href={`/strana/uslovi-koriscenja`}
            className={`text-[17px] font-extralight hover:text-[#b89980] cursor-pointer ${
              pathname === "/strana/uslovi-koriscenja" && "text-[#b89980]"
            }`}
          >
            Uslovi korišćenja
          </Link>
          <span>•</span>
          <Link
            href="/strana/zastita-privatnosti"
            className={`text-[17px]  font-extralight hover:text-[#b89980] cursor-pointer ${
              pathname === "/strana/zastita-privatnosti" && "text-[#b89980]"
            }`}
          >
            Zaštita privatnosti
          </Link>
        </div>
        <p className="text-[17px]  font-extralight max-md:text-center">
          &copy; {new Date().getFullYear()} Tied Up | Sva prava zadržana.
          Powered by{" "}
          <a
            href="https://www.croonus.com"
            target={"_blank"}
            className="hover:text-[#b89980] cursor-pointer bganimatethumb relative"
          >
            Croonus Technologies
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
