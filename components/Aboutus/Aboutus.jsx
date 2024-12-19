import Image from "next/image";
import playbutton from "@/assets/Images/playbutton.png";

const Aboutus = () => {
  return (
    <div className="max-sm:w-[95%] max-sm:mx-auto md:mx-5 lg:mx-[5rem] max-sm:mt-[5rem] md:mt-[9rem] overflow-visible">
      <div className="grid grid-cols-2 items-center max-md:gap-6 md:gap-10">
        <div className="max-md:col-span-2 col-span-1 pr-3 xl:pr-[5.5rem]">
          <h2 className="text-[50px] font-extralight">Upoznaj naš</h2>
          <div className="flex gap-4 items-center">
            <h2 className="font-bold uppercase text-[#215352] text-[50px] sm:text-[60px] leading-[50px]">
              Brend
            </h2>
            <Image src="/logo1.png" width={150} height={30} alt="Logo" />
          </div>
          <p className="mt-3 font-light text-[22px]">
            <strong>Tied Up</strong> nije samo brend – stvaramo modne detalje
            koji definišu vaš stil. Sa strašću za estetikom i kvalitetom, svaki
            naš proizvod je ručno izrađen kako bi istakao vašu ličnost i
            eleganciju.
          </p>
          <p className="mt-[0.2rem] font-light text-[22px]">
            Nudimo <strong>personalizaciju</strong> za jedinstvenost u svakoj
            prilici, od svakodnevnih trenutaka do posebnih događaja. Naši
            detalji odražavaju vaš ukus i stil.
          </p>
          <p className="mt-[0.2rem] font-light text-[22px]">
            Za nas moda nije samo ono što nosite – to je način na koji se
            predstavljate svetu. <strong>Tied Up</strong> je tu da vam pomogne
            da uvek budete najbolja verzija sebe.
          </p>
        </div>
        <div className="max-md:col-span-2 col-span-1 ml-auto relative h-fit w-full">
          <Image
            src={`/o-nama.png`}
            width={0}
            height={0}
            sizes={`100vw`}
            alt="about us"
            className="w-full h-auto "
          />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
