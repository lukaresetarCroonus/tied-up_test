const PlusMinusInputTwo = ({ className, amount, setCount }) => {
  // If minus is clicked
  const onMinusHandler = (e) => {
    e.preventDefault();
    if (amount !== 1) setCount((prev) => prev - 1);
    if (amount === "") setCount(1);
  };

  // If plus is clicked
  const onPlusHandler = (e) => {
    e.preventDefault();
    if (amount === "") setCount(1);
    else setCount((prev) => prev + 1);
  };

  // If value is typed in
  const onInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      if (+e.target.value < 1) setCount("");
      else setCount(+e.target.value);
    }
  };

  return (
    <div className="bg-[#474747] border border-[#aeaeae]">
      <div className=" flex items-center">
        <span
          className="cursor-pointer text-2xl select-none text-white px-4 sm:px-[25px]"
          onClick={onMinusHandler}
        >
          -
        </span>

        <input
          maxLength="2"
          type="number"
          value={amount}
          onChange={onInputChange}
          className="input-number h-[52px] w-[4rem] md:w-[70px] flex justify-center text-center bg-[#aeaeae] focus:border-none focus:outline-none focus:ring-0 select-none font-bold border-none text-white py-4 text-base md:text-xl"
        ></input>
        <span
          className="cursor-pointer text-2xl select-none text-white px-4 sm:px-[25px]"
          onClick={onPlusHandler}
        >
          +
        </span>
      </div>
    </div>
  );
};

export default PlusMinusInputTwo;
