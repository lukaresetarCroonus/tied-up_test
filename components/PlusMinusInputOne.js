import { toast } from "react-toastify";
import { useEffect } from "react";

const PlusMinusInputOne = ({
  className,
  quantity,
  setCount,
  maxAmount,
  setQuantity,
  count,
  updateCart,
  id,
}) => {
  const onPlus = () => {
    if (quantity < maxAmount) {
      setQuantity(quantity + 1);
      updateCart({
        id: id,
        quantity: quantity + 1,
        type: true,
      });
    }
  };
  const onMinus = () => {
    if (quantity > 1 && quantity <= maxAmount) {
      setQuantity(quantity - 1);
      updateCart({
        id: id,
        quantity: quantity - 1,
        type: true,
      });
    }
  };

  useEffect(() => {
    if (quantity > maxAmount && maxAmount > 0) {
      setQuantity(maxAmount);
      updateCart({
        id: id,
        quantity: maxAmount,
        message: false,
      });
    }
  }, [quantity]);

  return (
    <div className="bg-[#fbfbfb] px-3 border max-md:h-full py-[2px] border-[#eaeaea] max-md:border-[#919191]">
      <div className="flex items-center w-full">
        <span
          className="cursor-pointer flex-1 text-lg select-none"
          onClick={onMinus}
        >
          -
        </span>
        <input
          maxLength="2"
          max={maxAmount}
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(+e.target.value);
            updateCart({
              id: id,
              quantity: +e.target.value,
              type: true,
            });
          }}
          className="w-12 text-center  no-spinners mx-auto flex-1 bg-[#fbfbfb] focus:border-none focus:outline-none p-0 focus:ring-0 select-none text-sm border-none text-sm"
        ></input>
        <span
          className="cursor-pointer flex-1 text-lg select-none"
          onClick={onPlus}
        >
          +{" "}
        </span>
      </div>
    </div>
  );
};

export default PlusMinusInputOne;
