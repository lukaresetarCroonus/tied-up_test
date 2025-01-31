"use client";

export const pushToDataLayer = (event, data, amount) => {
  const is_client = isClient();
  if (is_client) {
    switch (event) {
      case "add_to_cart":
        return handleAddToCart(data, amount);
      case "remove_from_cart":
        return handleRemoveFromCart(data);
      case "add_to_wishlist":
        return handleAddToWishlist(data);
      case "remove_from_wishlist":
        return handleRemoveFromWishlist(data);
      case "view_item":
        return handleViewItem(data);
      case "begin_checkout":
        return handleBeginCheckout(data);
      case "purchase":
        return handlePurchase(data);
    }
  }
};

/////////////

const isClient = () => {
  return typeof window !== "undefined";
};
const handleClearObject = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ecommerce: null,
  });
};

/////////////
const handleAddToCart = (product, amount) => {
  handleClearObject();
  window.dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      currency: "RSD",
      value: product?.price?.discount?.active
        ? product?.price?.price?.discount
        : product?.price?.price?.original,
      items: [
        {
          item_name: product?.basic_data?.name,
          item_id: product?.basic_data?.id_product,
          price: product?.price?.discount?.active
            ? product?.price?.price?.discount
            : product?.price?.price?.original,
          item_brand: product?.basic_data?.brand_name,
          item_category1: product?.categories?.[0]?.name,
          item_variant: product?.basic_data?.name,
          quantity: amount,
        },
      ],
    },
  });
};

const handleRemoveFromCart = (product) => {
  handleClearObject();
  window?.dataLayer?.push({
    event: "remove_from_cart",
    ecommerce: {
      currency: "RSD",
      value: product?.price?.per_item?.total,
      items: [
        {
          item_id: product?.id,
          item_name: product?.name,
          price: product?.price?.per_item?.total,
          item_brand: product?.brand_name,
          item_category: product?.categories?.[0]?.name,
          quantity: product?.productQuantity,
        },
      ],
    },
  });
};

const handleAddToWishlist = (product) => {
  handleClearObject();
  window?.dataLayer?.push({
    event: "add_to_wishlist",
    ecommerce: {
      currency: "RSD",
      value: product?.price?.discount?.active
        ? product?.price?.price?.discount
        : product?.price?.price?.original,
      items: [
        {
          item_name: product?.basic_data?.name,
          item_id: product?.basic_data?.id_product,
          item_price: product?.price?.price?.original,
          item_brand: product?.basic_data?.brand_name,
          item_category1: product?.categories?.[0]?.name,
          item_variant: null,
          quantity: 1,
        },
      ],
    },
  });
};

const handleRemoveFromWishlist = (product) => {
  handleClearObject();
  window?.dataLayer?.push({
    event: "remove_from_wishlist",
    ecommerce: {
      currency: "RSD",
      value: product?.price?.discount?.active
        ? product?.price?.price?.discount
        : product?.price?.price?.original,
      items: [
        {
          item_name: product?.basic_data?.name,
          item_id: product?.basic_data?.id_product,
          price: product?.price?.price?.original,
          item_brand: product?.basic_data?.brand_name,
          item_category1: product?.categories?.[0]?.name,
          item_variant: null,
          quantity: 1,
        },
      ],
    },
  });
};

const handleViewItem = (product) => {
  handleClearObject();
  window.dataLayer.push({
    event: "view_item",
    ecommerce: {
      currency: "RSD",
      items: [
        {
          item_name: product?.basic_data?.name,
          item_id: product?.basic_data?.id_product,
          item_brand: product?.basic_data?.brand_name,
          item_category1: product?.categories?.[0]?.name,
          price: product?.price?.discount?.active
            ? product?.price?.price?.discount
            : product?.price?.price?.original,
          quantity: 1,
        },
      ],
    },
  });
};

const handleBeginCheckout = (data) => {
  handleClearObject();
  const totalValue = (data ?? [])
    ?.map(
      (item) => item?.product?.price?.per_item?.total * item?.cart?.quantity
    )
    ?.reduce((acc, curr) => acc + curr, 0);

  window?.dataLayer?.push({
    event: "begin_checkout",
    ecommerce: {
      currency: "RSD",
      value: totalValue,
      items: (data ?? [])?.map((item) => ({
        item_name: item?.product?.basic_data?.name,
        item_id: item?.product?.id,
        price:
          Number(item?.product?.price?.per_item?.total) *
          Number(item?.cart?.quantity),
        quantity: item?.cart?.quantity,
      })),
    },
  });
};

const handlePurchase = (data) => {
  handleClearObject();
  window?.dataLayer?.push({
    event: "purchase",
    ecommerce: {
      transaction_id: data?.order?.slug,
      value: data?.order?.total,
      tax: data?.order?.total_vat,
      currency: "RSD",
      shipping: data?.order?.total_delivery_amount,
      items: (data?.items ?? [])?.map((item) => {
        return {
          item_name: item?.basic_data?.name,
          item_id: item?.basic_data?.id_product,
          price: item?.price?.total_with_vat,
          item_brand: item?.basic_data?.brand_name,
          item_category1: item?.basic_data?.category_breadcrumbs,
          quantity: item?.price?.quantity,
          discount: item?.price?.price_discount_amount,
          item_variant: item?.basic_data?.attributes_text,
        };
      }),
    },
  });
};
