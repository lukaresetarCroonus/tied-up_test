"use client";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";

export default function Variants({
  product,
  updateProductVariant,
  updateProductPrice,
  productSlug,
  slug,
  handleURLChange,
  firstVariantOption,
  setSelectedColor,
  productVariant,
  setVariant,
  setVariantOnOff,
  setSelectedOptions,
}) {
  let variant_options = product?.data?.variant_options; // niz svih variant_options
  let variant_items = product?.data?.variant_items; // niz svih varijanti proizvoda
  let product_slug = productSlug; // slug proizvoda koji se prikazuje
  let variant_product = null; // krajnji proizvod koji se prikazuje
  const [selected, setSelected] = useState([]); // niz selektovanih variant_options

  useEffect(() => {
    if (setVariant) {
      setSelected([
        {
          attribute_key: variant_options[1]?.attribute?.key,
          value_key: variant_options[1]?.values[0]?.key,
        },
      ]);
      setVariantOnOff(false);
    }
  }, [setVariant]);

  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  const [variantOptions, setVariantOptions] = useState(variant_options); // niz variant_options koji se prikazuje
  useEffect(() => {
    // uzima item iz variant_items na osnovu slug-a
    let selected_item = getSelectedItem(product_slug);

    // if (!selected_item) {
    //   selected_item = handleVariantFirstOption();
    // }

    // ako postoji item iz variant_items na osnovu slug-a i setuje se selected
    if (selected_item) {
      setSelected(selected_item.variant_key_array);
      setSelectedColor(selected_item?.variant_key_array?.[0]?.value_key);
    }

    if (selected_item) {
      variant_product = selected_item;
      updateProductVariant(variant_product);
    }

    handleVariantOptionChange();
  }, [selected]);

  useEffect(() => {
    if (variant_items.length > 0) {
      const product = variant_items.find((item) => item.slug === productSlug);
      if (product) {
        updateProductVariant(product);
        onChangeHandler(
          product?.variant_key_array[0]?.attribute_key,
          product?.variant_key_array[0]?.value_key
        );
        onChangeHandler(
          product?.variant_key_array[1]?.attribute_key,
          product?.variant_key_array[1]?.value_key
        );
      }
    }
  }, [productSlug, variant_items]);

  // setuje prve opcije variant_options-a ukoliko je firstVariantOption true
  // const handleVariantFirstOption = () => {
  //   if (firstVariantOption && selected.length === 0) {
  //     return variant_items[0];
  //   }
  //   return null;
  // };

  //menja URL na osnovu selektovanih variant_options
  useEffect(() => {
    handleURLChange(product_slug);
  }, [product_slug]);

  // ako nema slug-a u URL-u, uzima prvi item iz variant_items i setuje ga kao selected
  useEffect(() => {
    const getProduct = () => {
      if (!product_slug) {
        variant_product = getSelectedItem(product_slug);
      }
    };
    getProduct();
  }, [product_slug]);

  // uzima item iz variant_items na osnovu slug-a
  const getSelectedItem = (slug) => {
    let t_item = null;
    variant_items?.map((item) => {
      if (item.slug === slug) {
        t_item = item;
      }
    });
    return t_item;
  };

  // funkcija koja variant_options setuje vrednost selected_value, selected i display
  const setVariantOptionsVisible = (data) => {
    let options = [];
    data?.map((item) => {
      let t_item = {
        attribute: item.attribute,
        values: [],
      };

      t_item.attribute["selected_value"] = false;

      item.values.map((value) => {
        let t_val = value;
        t_val["display"] = "show";
        t_val["selected"] = false;

        t_item.values.push(t_val);
      });

      options.push(t_item);
    });

    return options;
  };

  // funkcija koja trazi variant_items koji odgovaraju selektovanim variant_options
  const getSelectedVariants = (selected, variant_items) => {
    let options = [];
    variant_items.map((item) => {
      let t_count = 0;
      if (selected.length) {
        selected.map((temp_condition) => {
          item.variant_key_array.map((temp_variant_key_array) => {
            if (
              temp_condition.attribute_key ===
                temp_variant_key_array.attribute_key &&
              temp_condition.value_key === temp_variant_key_array.value_key
            ) {
              t_count += 1;
            }
          });
        });
      }

      if (t_count === selected.length) {
        options.push(item);
      }
    });
    return options;
  };

  // funkcija koja vraca proizvod na osnovu selektovanih variant_options
  const getProductVariant = () => {
    let options = getSelectedVariants(selected, variant_items);
    let product = [];

    if (options.length === 1) {
      product = options[0];
    }

    return product;
  };

  // funkcija koja oznacuje variant_options koja je selektovana
  const selectVariantOptions = (variant_options, attribute_key, value_key) => {
    variant_options.map((item) => {
      if (item.attribute.key === attribute_key) {
        item.values.map((value) => {
          if (value.key === value_key) {
            value.selected = true;
            item.attribute.selected_value = true;
          }
        });
      }
    });
    return variant_options;
  };

  // funkcija koja vraca niz variant_options koji nisu selektovani
  const getNotSelectedVariantOptions = (variant_options) => {
    let options = [];
    variant_options.map((item) => {
      if (!item.attribute.selected_value) {
        options.push(item.attribute.key);
      }
    });
    return options;
  };

  // funkcija koja izbacuje duplikate iz niza
  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

  // funkcija koja vraca niz vrednosti za prikaz na osnovu selektovanih variant_options
  const setValuesFromVariantOptions = (
    selected_variants,
    temp_not_selected
  ) => {
    let options = [];
    selected_variants.map((item) => {
      item.variant_key_array.map((variant_key_array) => {
        if (variant_key_array.attribute_key === temp_not_selected) {
          options.push(variant_key_array.value_key);
        }
      });
    });

    return removeDuplicates(options);
  };

  // funkcija koja postavlja vrednosti za prikaz na osnovu selektovanih variant_options
  const setValuesForShowToVariantOptions = (
    variant_options,
    temp_not_selected,
    values_to_show
  ) => {
    variant_options.map((item) => {
      if (item.attribute.key === temp_not_selected) {
        item.values.map((value) => {
          if (values_to_show.indexOf(value.key) === -1) {
            value.display = "hide";
          } else {
            value.display = "show";
          }
        });
      }
    });

    return variant_options;
  };

  // funkcija koja menja stanje variant_options
  const handleVariantOptionChange = () => {
    variant_options = setVariantOptionsVisible(variant_options);
    if (selected.length) {
      let check_selected = [];

      selected.map((temp_select) => {
        variant_options = selectVariantOptions(
          variant_options,
          temp_select.attribute_key,
          temp_select.value_key
        );

        check_selected.push(temp_select);
        let selected_variants = getSelectedVariants(
          check_selected,
          variant_items
        );

        let not_selected = getNotSelectedVariantOptions(variant_options);

        if (not_selected.length) {
          not_selected.map((temp_not_selected) => {
            let values_to_show = setValuesFromVariantOptions(
              selected_variants,
              temp_not_selected
            );
            variant_options = setValuesForShowToVariantOptions(
              variant_options,
              temp_not_selected,
              values_to_show
            );
          });
        }
      });
    }

    setVariantOptions(variant_options);
  };

  // onChangeHandler funkcija za selektovanje variant_options nakon odabira vrednosti
  const onChangeHandler = (attribute_key, value_key) => {
    let temp_selected = selected;

    let temp_selected_item = {
      attribute_key: attribute_key,
      value_key: value_key,
    };

    let temp_index = temp_selected.findIndex(
      (x) => x.attribute_key === temp_selected_item.attribute_key
    );

    if (temp_index > -1) {
      temp_selected[temp_index] = temp_selected_item;
      temp_selected.map((temp_selected_item, index) => {
        if (index > temp_index) {
          temp_selected.splice(index, temp_selected.length - index);
        }
      });
    } else {
      temp_selected.push(temp_selected_item);
    }

    setSelected(temp_selected);
  };

  return (
    <div className="flex flex-col  gap-3 max-lg:w-full  2xl:w-1/2">
      {variantOptions.map((item) => {
        return (
          <div className="flex  max-sm:rounded  flex-col gap-0.5">
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
                if (e.target.value !== "none") {
                  onChangeHandler(item.attribute.key, e.target.value);
                  setSelectedColor(e.target.value);
                  handleVariantOptionChange();
                  variant_product = getProductVariant();
                  if (variant_product) {
                    updateProductVariant(variant_product);
                    handleURLChange(variant_product?.slug);
                    product_slug = variant_product?.slug;
                  } else {
                    updateProductVariant(null);
                  }
                } else {
                  handleURLChange(product?.data?.item?.slug);
                  setSelected([]);
                  updateProductVariant(null);
                }
              }}
            >
              <option value={`none`}>Izaberite</option>
              {item.values.map((value) => {
                let display = value.display;

                return (
                  <option
                    key={value.id}
                    value={value.key}
                    selected={value.selected}
                    style={{ display: value.display }}
                    className={
                      display === "show" ? `block max-sm:text-right` : `hidden`
                    }
                  >
                    {value.name}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
}
