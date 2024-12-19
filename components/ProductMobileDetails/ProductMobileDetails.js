"use client";
import ProductMobileGallery from "./ProductMobileGallery";
import React, { useEffect, useState } from "react";
import ProductMobileInfo from "./ProductMobileInfo";
import Tabs from "@/components/ProductDetails/Tabs";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import UpsellProducts from "@/components/UpsellProducts/UpsellProducts";
import CrosssellProducts from "@/components/CrosssellProducts/CrosssellProducts";

const ProductMobileDetails = ({
  breadcrumbs,
  path,
  crosssellProducts,
  declaration,
  desc,
  product,
  productGallery,
  relatedProducts,
  specification,
  stickers,
  upsellProducts,
}) => {
  const [rawGallery, setRawGallery] = useState(productGallery);
  const [loading, setLoading] = useState(false);
  const filteredImages = productGallery?.filter((image) => {
    return !image?.variant_key;
  });
  const [gallery, setGallery] = useState(filteredImages);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (color !== null) {
      setLoading(true);
      setGallery(filteredImages);
      const newImage = rawGallery?.find((item) => {
        return item?.variant_key?.includes(color);
      });
      setGallery((prev) => [newImage, ...prev]);
    }
  }, [color]);

  return (
    <div className="max-md:mt-[1rem] mt-[9rem] max-md:w-[95%]  max-md:mx-auto mx-[5rem] gap-x-[4.063rem] grid grid-cols-4">
      <ProductMobileGallery
        productGallery={gallery}
        color={color}
        loading={loading}
        setLoading={setLoading}
        product={product}
        stickers={stickers}
      />
      <ProductMobileInfo
        product={product}
        desc={desc}
        path={path}
        setColor={setColor}
        breadcrumbs={breadcrumbs}
        specification={specification}
        declaration={declaration}
      />
      <div className={`mt-10`}>
        {relatedProducts?.length > 0 && (
          <RelatedProducts
            relatedProducts={relatedProducts}
            loading={loading}
          />
        )}
        {upsellProducts?.length > 0 && (
          <UpsellProducts upsellProducts={upsellProducts} loading={loading} />
        )}
        {crosssellProducts?.length > 0 && (
          <CrosssellProducts
            crosssellProducts={crosssellProducts}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default ProductMobileDetails;
