"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { CheckoutData } from "../Cart/CheckoutData";
import { useCart, useForm, useSummary } from "@/hooks/croonus.hooks";
import { CartWrapper } from "@/components/Cart/cart-wrapper";
import { CartLoader } from "@/components/Cart/cart-loader";
import { CartNoItems } from "@/components/Cart/cart-no-items";
import { CheckoutDataLoader } from "@/components/Cart/checkout-data-loader";

export const CheckoutPage = ({
  payment_options,
  delivery_options,
  recommendedProducts,
  countries,
  className,
}) => {
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const [formData, setFormData] = useState({
    customer_type_billing: "personal",
    first_name_shipping: "",
    last_name_shipping: "",
    phone_shipping: "",
    email_shipping: "",
    address_shipping: "",
    object_number_shipping: "",
    town_name_shipping: "",
    zip_code_shipping: "",
    id_country_shipping: "193",
    country_name_shipping: "Srbija",
    note_shipping: "",
    first_name_billing: "",
    last_name_billing: "",
    phone_billing: "",
    email_billing: "",
    address_billing: "",
    object_number_billing: "",
    town_name_billing: "",
    zip_code_billing: "",
    id_country_billing: "193",
    country_name_billing: "Srbija",
    note_billing: "",
    payment_method: "",
    delivery_method: null,
    note: "",
    gcaptcha: token,
    company_name_billing: null,
    pib_billing: null,
    maticni_broj_billing: null,
    floor_billing: null,
    apartment_number_billing: null,
    id_town_billing: null,
    id_municipality_billing: null,
    municipality_name_billing: null,
    id_company_shipping: null,
    id_company_address_shipping: null,
    company_name_shipping: null,
    pib_shipping: null,
    maticni_broj_shipping: null,
    floor_shipping: null,
    apartment_number_shipping: null,
    id_town_shipping: null,
    id_municipality_shipping: null,
    municipality_name_shipping: null,
    delivery_method_options: [],
    payment_method_options: [],
    promo_code: null,
    promo_code_options: [],
    accept_rules: false,
  });

  //fetchujemo sve artikle iz korpe
  const {
    data: items,
    refetch: refreshCart,
    isLoading: isFetching,
  } = useCart();
  //fetchujemo summary korpe (iznos,popuste,dostavu itd)
  const { data, refetch: refreshSummary } = useSummary({
    items: items?.items?.map((item) => {
      return Number(item?.cart?.quantity);
    }),
    formData: formData,
  });

  const cartCost = items?.items?.summary?.total ?? 0;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFetching) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isFetching]);

  const renderCart = () => {
    switch (true) {
      case isLoading:
        return <CartLoader />;
      case items?.items?.length > 0 && !isLoading:
        return (
          <CartWrapper
            data={data}
            cartCost={cartCost}
            verifyCaptcha={verifyCaptcha}
            recommendedProducts={recommendedProducts}
          >
            <Suspense fallback={<CheckoutDataLoader />}>
              <CheckoutData
                token={token}
                setFormData={setFormData}
                formData={formData}
                className={className}
                delivery_options={delivery_options}
                payment_options={payment_options}
                items={items?.items}
                refreshSummary={refreshSummary}
                summary={data?.summary}
                options={data?.summary?.options}
                totals={data?.summary?.totals}
                refreshCart={refreshCart}
              />
            </Suspense>
          </CartWrapper>
        );
      case items?.items?.length === 0 && !isLoading:
        return <CartNoItems />;
      default:
        return <CartLoader />;
    }
  };

  return renderCart();
};
