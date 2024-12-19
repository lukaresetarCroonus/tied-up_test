"use client";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Tabs from "@/components/ProductDetails/Tabs";
import CrosssellProducts from "../CrosssellProducts/CrosssellProducts";
import UpsellProducts from "../UpsellProducts/UpsellProducts";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { pushToDataLayer } from "@/_services/data-layer";

const ProductDetails = ({
  product,
  productGallery,
  desc,
  path,
  breadcrumbs,
  specification,
  declaration,
  stickers,
  canonical,
  id,
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
      setGallery(filteredImages);
      const newImage = rawGallery?.find((item) => {
        return item?.variant_key?.includes(color);
      });
      if (newImage) {
        setGallery((prev) => [newImage, ...prev]);
      }
    }
  }, [color]);

  useEffect(() => {
    if (product) {
      pushToDataLayer("view_item", product?.data?.item);
    }
  }, []);

  return (
    <div
      className={`max-md:mt-[1rem]  max-md:w-[95%]  max-md:mx-auto md:mx-[3rem] mt-6`}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <Link
          href={`/`}
          className="text-[#191919] text-[0.95rem] font-normal hover:text-[#b89980]"
        >
          Početna
        </Link>{" "}
        <>/</>
        {(breadcrumbs?.steps ?? [])?.map((breadcrumb, index, arr) => {
          return (
            <div className="flex items-center gap-2">
              <Link
                href={
                  index === arr?.length - 1
                    ? `/${breadcrumb?.link?.link_path}`
                    : `/${breadcrumb?.link?.link_path}`
                }
                className="text-[#000] text-[0.95rem] font-normal hover:text-[#b89980]"
              >
                {breadcrumb?.name}
              </Link>
              {index !== arr.length - 1 && <>/</>}
            </div>
          );
        })}
        {breadcrumbs?.steps?.length > 0 && <>/</>}
        <p className="text-[#215352] text-[0.95rem] font-normal">
          {breadcrumbs?.end?.name}
        </p>
      </div>
      <div className=" grid grid-cols-4  gap-x-[4.063rem] mt-10">
        <ProductGallery
          productGallery={gallery}
          color={color}
          loading={loading}
          setLoading={setLoading}
          product={product}
          stickers={stickers}
        />
        <ProductInfo
          canonical={canonical}
          product={product}
          desc={desc}
          path={path}
          color={color}
          setColor={setColor}
          breadcrumbs={breadcrumbs}
          specification={specification}
          declaration={declaration}
          id={id}
        />
      </div>
      <div className={`mt-10`}>
        <Suspense
          fallback={
            <div className={`w-full h-20 bg-slate-200 animate-pulse`} />
          }
        >
          <RelatedProducts id={product?.data?.item?.basic_data?.id_product} />
        </Suspense>
        <Suspense
          fallback={
            <div className={`w-full h-20 bg-slate-200 animate-pulse`} />
          }
        >
          <UpsellProducts id={product?.data?.item?.basic_data?.id_product} />
        </Suspense>
        <Suspense
          fallback={
            <div className={`w-full h-20 bg-slate-200 animate-pulse`} />
          }
        >
          <CrosssellProducts id={product?.data?.item?.basic_data?.id_product} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductDetails;
