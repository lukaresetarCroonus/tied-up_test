import React from "react";
import Image from "next/image";
import Cancel from "../../assets/Icons/cancel.png";

const InfoModal = ({ infoModal, setInfoModal }) => {
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("max-md:z-[20000]")) {
          setInfoModal(false);
        }
      }}
      className={
        infoModal
          ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
          : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
      }
    >
      <div
        className={`
  
      bg-white rounded-lg max-md:overflow-y-scroll p-[40px] flex flex-col md:w-[890px] md:h-[490px]`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-bold uppercase">ISPORUKA</h1>
          <Image
            src={Cancel}
            alt="cancel"
            width={20}
            height={20}
            onClick={() => setInfoModal(false)}
            className="cursor-pointer"
          />
        </div>
        <p className="font-light text-base mt-5">
          Trudimo se da sve porudžbine primljene do 12h isporučimo istog dana. U
          slučaju većeg obima posla ili potrebe za dodatnim vremenom za izradu,
          pošiljka će biti poslata narednog dana. Naš cilj je da uvek pružimo
          brzu i efikasnu uslugu, uz maksimalnu posvećenost kvalitetu proizvoda.
          Pošiljke šaljemo post express-om sa opcijom danas za sutra.
        </p>
      </div>
    </div>
  );
};

export default InfoModal;
