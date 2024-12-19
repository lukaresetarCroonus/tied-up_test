import React from "react";
import Image from "next/image";
import Cancel from "../../assets/Icons/cancel.png";

const DeliveryModal = ({ deliveryModal, setDeliveryModal, description }) => {
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("fixed")) {
          setDeliveryModal(false);
        }
      }}
      className={
        deliveryModal
          ? `max-md:z-[20000] fixed max-md:mx-auto scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
          : `max-md:z-[20000] fixed max-md:mx-auto scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
      }
    >
      <div
        className={`bg-white rounded-lg p-[40px] flex flex-col max-w-[95%] md:max-w-[50%] mx-auto max-h-[90%] m-auto`}
      >
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-bold">Detaljan opis proizvoda</p>
          <Image
            src={Cancel}
            alt="cancel"
            width={20}
            height={20}
            onClick={() => setDeliveryModal(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-5 overflow-y-auto prose">
          <p
            className={`text-sm`}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;
