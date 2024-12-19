import Link from "next/link";
import Image from "next/image";
import aboutusimage from "@/assets/Images/aboutusimage.png";

const Onama = () => {
  return (
    <>
      <div className="flex flex-col mt-5 md:mt-16 items-center  relative p-2 md:w-[80%] mx-auto">
        <div className="grid grid-cols-2 place-items-center gap-5">
          <div className="max-md:col-span-2 col-span-1 md:px-10 max-md:px-2">
            <h3 className="italic text-[#c0c0c0] font-light text-[22px]">
              O nama
            </h3>
            <h1 className={`text-[#215352] font-bold text-[30px] mt-[1rem]`}>
              Dobrodošli u svet Tied Up elegancije i autentičnosti
            </h1>
            <p className="mt-3 font-light text-[22px]">
              <strong>Tied Up</strong> nije samo brend – mi stvaramo modne
              detalje koji definišu vaš stil. Sa strašću za estetikom i
              kvalitetom, svaki naš proizvod, bilo da je to kravata, leptir
              mašna, šal ili manžetne, ručno je izrađen kako bi istakao vašu
              ličnost i eleganciju.
            </p>
            <p className="mt-[0.2rem] font-light text-[22px]">
              Nudimo <strong>personalizaciju</strong> koja vam omogućava da
              budete jedinstveni u svakoj prilici. Od svakodnevnih trenutaka do
              posebnih događaja, naši detalji govore o vašem ukusu i stilu.
            </p>
            <p className="mt-[0.2rem] font-light text-[22px]">
              Verujemo da moda nije samo ono što nosite – to je način na koji se
              predstavljate svetu. <strong>Tied Up</strong> je tu da vam pomogne
              da uvek budete najbolja verzija sebe.
            </p>
          </div>
          <div className="max-md:col-span-2 col-span-1">
            <Image src={aboutusimage} alt="" width={740} height={540} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Onama;

export const metadata = {
  title: "O nama | TiedUp",
  description: "O nama",
};
