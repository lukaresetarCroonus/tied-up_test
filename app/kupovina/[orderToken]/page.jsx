import { get } from "@/app/api/api";
import OrderSuccess from "@/components/OrderToken/OrderToken";

const userOrderToken = async (orderToken) => {
  return await get(`/checkout/info/${orderToken}`).then(
    (response) => response?.payload
  );
};
const orderToken = async ({ params: { orderToken } }) => {
  const order = await userOrderToken(orderToken);

  return <OrderSuccess order={order} />;
};

export default orderToken;

export const metadata = {
  title: "Kupovina | TiedUp",
  description: "Dobrodošli na TiedUp Online Shop",
  keywords: [
    "TiedUp",
    "online",
    "shop",
    "TiedUp.com",
    "farmerke",
    "trenerke",
    "dukserice",
    "TiedUp obuca",
    "obuca",
    "TiedUp online",
  ],
};
