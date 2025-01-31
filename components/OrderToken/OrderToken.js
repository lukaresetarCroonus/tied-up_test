"use client";

import { OrderItemsInfo, OrderPaymentInfo } from "@/_components/order";
import { pushToDataLayer } from "@/_services/data-layer";

const OrderSuccess = ({ order }) => {
  if (order) {
    pushToDataLayer("purchase", order);

    return (
      <div
        className={`grid grid-cols-2 mt-[0rem] lg:mt-[9rem] md:w-[90%] mx-auto gap-x-10 md:divide-y md:divide-gray-200`}
      >
        <OrderPaymentInfo order={order} />
        <OrderItemsInfo order={order} />
      </div>
    );
  }
};

export default OrderSuccess;
