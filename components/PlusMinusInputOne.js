import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "@/hooks/croonus.hooks";

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
  const [localQuantity, setLocalQuantity] = useState(quantity);  // Local state for quantity
  const debouncedQuantity = useDebounce(localQuantity, 100); // Debounce quantity updates with a delay (100ms)

  const onPlus = () => {
    if (localQuantity < maxAmount) {
      setLocalQuantity(localQuantity+1);
    }
  };

  const onMinus = () => {
    if (localQuantity > 1 && localQuantity <= maxAmount) {
      setLocalQuantity(localQuantity-1);
    }
  };

  // Sync the debounced quantity to the cart update
  useEffect(() => {
    if (debouncedQuantity !== quantity) {
      updateCart({
        id: id,
        quantity: debouncedQuantity,
        type: true,
      });
    }
  }, [debouncedQuantity, quantity, id, updateCart]);

  // Ensure we do not set a quantity higher than maxAmount
  useEffect(() => {
    if (localQuantity > maxAmount && maxAmount > 0) {
      setLocalQuantity(maxAmount);
      updateCart({
        id: id,
        quantity: maxAmount,
        message: false,
      });
    }
  }, [localQuantity, maxAmount, id, updateCart]);

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
          value={localQuantity}
          onChange={(e) => setLocalQuantity(+e.target.value)}
          className="w-12 text-center no-spinners mx-auto flex-1 bg-[#fbfbfb] focus:border-none focus:outline-none p-0 focus:ring-0 select-none text-sm border-none text-sm"
        />
        <span
          className="cursor-pointer flex-1 text-lg select-none"
          onClick={onPlus}
        >
          +
        </span>
      </div>
    </div>
  );
};

export default PlusMinusInputOne;
