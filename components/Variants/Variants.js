"use client";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Variants({
  product,
  updateProductVariant,
  updateProductPrice,
  productSlug,
  slug,
  handleURLChange,
  firstVariantOption,
  setSelectedColor,
  setSelectedProizvod,
  productVariant,
  setVariant,
  setVariantOnOff,
  setSelectedOptions,
}) {
  const variant_options = product?.data?.variant_options; // Array of variant options
  const variant_items = product?.data?.variant_items; // Array of product variants
  const [selected, setSelected] = useState([]); // Selected variant options

  // Update selected options in the parent component
  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  // Update product and URL when variant changes
  useEffect(() => {
    const variantProduct = getProductVariant();
    if (variantProduct) {
      updateProductVariant(variantProduct);
      handleURLChange(variantProduct?.slug);
    }
  }, [selected]);

  // Get product variant based on selected options
  const getProductVariant = () => {
    const matchingVariant = variant_items?.find((item) => {
      return selected.every((option) => {
        return item.variant_key_array.some(
          (variant) =>
            variant.attribute_key === option.attribute_key &&
            variant.value_key === option.value_key
        );
      });
    });
    return matchingVariant;
  };

  // Handle the change of variant options (select)
  const onVariantOptionChange = (attribute_key, value_key) => {
    const newSelected = [...selected];
    const index = newSelected.findIndex(
      (item) => item.attribute_key === attribute_key
    );

    if (index > -1) {
      newSelected[index].value_key = value_key; // Update existing option
    } else {
      newSelected.push({ attribute_key, value_key }); // Add new option
    }
    console.log('a',attribute_key);
    console.log('v',value_key);
    setSelected(newSelected);
    handleSpecificUpdates(attribute_key, value_key);
  };

  // Handle updates for color and product
  const handleSpecificUpdates = (attribute_key, value_key) => {
    if (attribute_key === "3-boja") {
      setSelectedColor(value_key);
    }
    if (attribute_key === "1-proizvod") {
      setSelectedProizvod(value_key);
    }
  };

  // Create variant options for display (e.g., "select" dropdown)
  const renderVariantOptions = () => {
    return variant_options.map((item) => (
      <div key={item.id} className="flex flex-col gap-1">
        <label
          htmlFor={item.id}
          className="max-lg:text-left max-sm:text-sm max-sm:w-[10rem] max-sm:uppercase max-sm:rounded mb-2 "
        >
          Izaberi opciju :
        </label>
        <select
          key={item.id}
          id={item.id}
          name={item.attribute.key}
          className="focus:ring-0 focus:border-black max-sm:p-2 py-1 max-sm:flex max-sm:justify-end border-[1px] border-black md:w-[60%] max-md:w-full"
          onChange={(e) => {
            const value = e.target.value;
            if (value !== "none") {
              onVariantOptionChange(item.attribute.key, value);
            } else {
              setSelected([]);
              updateProductVariant(null); // Reset product variant if no option is selected
              handleURLChange(product?.data?.item?.slug); // Reset URL if no option is selected
            }
          }}
        >
          <option value="none">Izaberite</option>
          {item.values.map((value) => (
            <option
              key={value.id}
              value={value.key}
              selected={value.selected}
              style={{ display: value.display }}
            >
              {value.name}
            </option>
          ))}
        </select>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-3 max-lg:w-full 2xl:w-1/2">
      {renderVariantOptions()}
    </div>
  );
}
