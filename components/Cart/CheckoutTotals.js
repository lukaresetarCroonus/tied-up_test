import { currencyFormat } from "@/helpers/functions";

const CheckoutTotals = ({ className, options, totals, summary, formData }) => {
  return (
    <div className={`flex flex-col pl-2`}>
      <div className={`flex items-center justify-between py-2`}>
        <p className={`${className} text-[0.965rem] font-normal`}>
          Ukupna vrednost korpe:
        </p>
        <p className={`${className} text-[1rem] font-light`}>
          {currencyFormat(totals?.with_vat)}
        </p>
      </div>
      <div
        className={`flex items-center justify-between border-t border-t-white py-2`}
      >
        <p className={`${className} text-[0.965rem] font-normal`}>Popust:</p>
        <p className={`${className} text-[1rem] font-light`}>
          -
          {currencyFormat(
            totals?.items_discount_amount + totals?.cart_discount_amount
          )}
        </p>
      </div>
      {totals?.promo_code_amount > 0 && (
        <div
          className={`flex items-center justify-between border-t border-t-white py-2`}
        >
          <p className={`${className} text-[0.965rem] font-normal`}>
            Iznos promo koda:
          </p>
          <p className={`${className} text-[1rem] font-light`}>
            -{currencyFormat(totals?.promo_code_amount)}
          </p>
        </div>
      )}
      {totals?.delivery_amount > 0 ? (
        <div
          className={`flex items-center justify-between border-t border-t-white py-2`}
        >
          <p className={`${className} text-[0.965rem] font-normal`}>Dostava:</p>
          <p className={`${className} text-[1rem] font-light`}>
            {currencyFormat(totals?.delivery_amount)}
          </p>
        </div>
      ) : (
        <div
          className={`flex items-center justify-between border-t border-t-white py-2`}
        >
          <p className={`${className} text-[0.965rem] font-normal`}>Dostava:</p>
          <p className={`${className} text-[1rem] font-light`}>
            besplatna dostava
          </p>
        </div>
      )}
      <div
        className={`flex items-center justify-between border-t border-t-white py-2`}
      >
        <p className={`${className} text-[0.965rem] font-normal`}>
          Ukupno za naplatu:
        </p>
        <p className={`${className} text-[1rem] font-medium`}>
          {currencyFormat(totals?.total)}
        </p>
      </div>
    </div>
  );
};

export default CheckoutTotals;
