"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  post as POST,
  deleteMethod as DELETE,
  list as LIST,
  get as GET,
  put as PUT,
} from "@/app/api/api";
import { toast } from "react-toastify";
import { useCartContext } from "@/app/api/cartContext";

//hook za prepoznavanje mobilnih uredjaja, vraca true ili false
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

//hook za debouncing (za search), na svaki input se resetuje timer i tek kad se neko vreme ne unosi nista se poziva funkcija
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

//hook za prepoznavanje scrolla, vraca true ili false za headerShowing i sideBarShowing
export const useScroll = () => {
  const [headerShowing, setHeaderShowing] = useState(false);
  const [sideBarShowing, setSideBarShowing] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 40) return setHeaderShowing(false);
      const currentScroll = window.scrollY;
      if (currentScroll > 250) {
        setHeaderShowing(true);
      } else {
        setHeaderShowing(false);
      }
      if (currentScroll > 1000) {
        setSideBarShowing(true);
      } else {
        setSideBarShowing(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { headerShowing, sideBarShowing };
};

//hook za dobijanje kategorija
export const useCategoryTree = () => {
  return useSuspenseQuery({
    queryKey: ["categoryTree"],
    queryFn: async () => {
      return await GET(`/categories/product/tree`).then((res) => res?.payload);
    },
  });
};

//hook za dobijanje liste landing strana, koriscen useQuery umesto useSuspenseQuery-ja sto je popravilo stvar
export const useLandingPages = () => {
  return useQuery({
    queryKey: ["landingPagesList"],
    queryFn: async () => {
      return await LIST(`/landing-pages/list`).then((res) => res?.payload);
    },
  });
};

//hook za dodavanje u korpu, proslediti id i kolicinu
export const useAddToCart = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async ({ id, quantity, message, type = false }) => {
      return await POST(`/cart`, {
        id_product: +id,
        quantity: quantity,
        id_product_parent: null,
        description: null,
        status: null,
        quantity_calc_type: type ? "replace" : "calc",
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            toast.success(message ?? "Uspešno dodato u korpu", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error(
              res?.payload?.message ?? "Greška prilikom dodavanja u korpu",
              {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }
            );
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za proveru kolicine artikala u korpi
export const useCartBadge = () => {
  const [cart] = useCartContext();

  return useQuery({
    queryKey: ["cartBadge", cart],
    queryFn: async () => {
      return await GET("/cart/badge-count").then(
        (res) => Number(res?.payload?.summary?.total_quantity)?.toFixed(0) ?? 0
      );
    },
  });
};

//hook za proveru kolicine artikala u listi zelja
export const useWishlistBadge = () => {
  const [, , wishList] = useCartContext();

  return useQuery({
    queryKey: ["wishlistBadge", wishList],
    queryFn: async () => {
      return await GET("/wishlist/badge-count").then(
        (res) => Number(res?.payload?.summary?.total_quantity)?.toFixed(0) ?? 0
      );
    },
    refetchOnWindowFocus: false,
  });
};

//hook za brisanje iz korpe, proslediti samo id kad se poziva mutate() funckija
export const useRemoveFromCart = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["removeFromCart"],
    mutationFn: async ({ id }) => {
      return await POST(`/cart`, {
        id_product: +id,
        quantity: 0,
        id_product_parent: null,
        description: null,
        status: null,
        quantity_calc_type: "calc",
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            toast.success("Uspešno obrisano iz korpe.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error(
              res?.payload?.message ?? "Greška prilikom brisanja iz korpe.",
              {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }
            );
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dodavanje u listu zelja, proslediti samo id kad se poziva mutate() funckija
export const useAddToWishlist = () => {
  const [, , , mutateWishList] = useCartContext();

  return useMutation({
    mutationKey: ["addToWishlist"],
    mutationFn: async ({ id, name }) => {
      return await POST(`/wishlist`, {
        id: null,
        id_product: +id,
        quantity: 1,
        id_product_parent: null,
        description: null,
        status: null,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateWishList();
            toast.success(`Proizvod uspešno dodat u listu želja.`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Greška prilikom dodavanja u listu želja.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za briasanje iz liste zelja, proslediti samo id kad se poziva mutate() funckija
export const useRemoveFromWishlist = () => {
  const [, , , mutateWishList] = useCartContext();

  return useMutation({
    mutationKey: ["removeFromWishlist"],
    mutationFn: async ({ id }) => {
      return await DELETE(`/wishlist/${id}`).then((res) => {
        switch (res?.code) {
          case 200:
            mutateWishList();
            toast.success("Uspešno obrisano iz liste želja.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Greška prilikom brisanja iz liste želja.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za search, proslediti searchTerm inicijalno pri pozivu hook-a i pri pozivanju funkcije
export const useSearch = ({ searchTerm, isSearchPage = false }) => {
  switch (isSearchPage) {
    case false:
      return useQuery({
        queryKey: [{ search: searchTerm }],
        queryFn: async () => {
          if (searchTerm?.length >= 3) {
            return await LIST("/products/search/list", {
              search: searchTerm,
            }).then((res) => res?.payload);
          }
        },
        refetchOnWindowFocus: false,
      });

    case true:
      return useSuspenseQuery({
        queryKey: [{ search: searchTerm }],
        queryFn: async () => {
          if (searchTerm?.length >= 3) {
            return await LIST("/products/search/list", {
              search: searchTerm,
            }).then((res) => res?.payload?.items);
          }
        },
        refetchOnWindowFocus: false,
      });

    default:
      break;
  }
};

//hook za proveru da li je artikal u listi zelja, proslediti id artikla inicijalno i pozvati refetch pri svakom dodavanju u listu zelja
export const useIsInWishlist = ({ id }) => {
  return useQuery({
    queryKey: ["isInWishlist", { id: id }],
    queryFn: async () => {
      return await GET(`/wishlist/product-in-wishlist/${id}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje svih proizvoda u listi zelja
export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist_items"],
    queryFn: async () => {
      return await LIST(`/wishlist`, {
        render: false,
      }).then((res) => res?.payload?.items ?? []);
    },
    refetchOnWindowFocus: false,
  });
};

//hook za prijavljivanje na newsletter
export const useNewsletter = () => {
  return useMutation({
    mutationKey: ["newsletter"],
    mutationFn: async ({ email }) => {
      return await POST(`/newsletter`, { email: email }).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success(res?.payload?.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Došlo je do greške. Pokušajte ponovo.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
  });
};

//hook za dobijanje izabrane kategorije, proslediti slug kategorije
export const useCategory = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["category", { slug: slug }],
    queryFn: async () => {
      return await GET(`/categories/product/single/${slug}`).then(
        (res) => res?.payload
      );
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje filtera izaabrane kategorije, proslediti slug kategorije, page,limit,sort i selektovane filtere
export const useCategoryFilters = ({
  slug,
  page,
  limit,
  sort,
  selectedFilters,
  isSection,
}) => {
  return useMutation({
    mutationKey: [
      "categoryFilters",
      {
        slug: slug,
        page: page,
        limit: limit,
        sort: sort,
        selectedFilters: selectedFilters,
      },
    ],
    mutationFn: async ({
      slug,
      selectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
    }) => {
      return await POST(
        isSection
          ? `/products/section/filters/${slug}`
          : `/products/category/filters/${slug}`,
        {
          filters: selectedFilters,
        }
      ).then((response) => {
        const lastSelectedFilterValues = selectedFilters?.find((item) => {
          return item?.column === lastSelectedFilterKey;
        });

        const lastSelectedFilter = availableFilters?.find((item) => {
          return item?.key === lastSelectedFilterKey;
        });

        const filterLastSelectedFromResponse = response?.payload?.filter(
          (item) => {
            return item?.key !== lastSelectedFilterKey;
          }
        );
        // const specFilter = response?.payload?.filter((spec) => spec.name !== "Varijante - Boja");

        const indexOfLastSelectedFilter = availableFilters?.findIndex(
          (index) => {
            return index?.key === lastSelectedFilterKey;
          }
        );

        if (
          lastSelectedFilter &&
          lastSelectedFilterValues?.value?.selected?.length > 0
        ) {
          setAvailableFilters([
            ...filterLastSelectedFromResponse.slice(
              0,
              indexOfLastSelectedFilter
            ),
            lastSelectedFilter,
            ...filterLastSelectedFromResponse.slice(indexOfLastSelectedFilter),
          ]);
        } else {
          setAvailableFilters(response?.payload);
        }
      });
    },
  });
};

//hook za dobijanje artikala iz kategorije, proslediti slug kategorije, page,limit,sort i selektovane filtere

export const useCategoryProducts = ({
  slug,
  page,
  setPage,
  limit,
  sort,
  setSelectedFilters,
  filterKey,
  setSort,
  render = true,
  setIsLoadingMore,
  isSection,
}) => {
  return useQuery({
    queryKey: [
      "categoryProducts",
      {
        slug: slug,
        page: page,
        limit: limit,
        sort: sort,
        selectedFilters: filterKey,
        render: render,
      },
    ],
    queryFn: async () => {
      try {
        //vadimo filtere iz URL koji su prethodno selektovani i pushovani sa router.push()
        const selectedFilters_tmp = (filterKey ?? "::")
          ?.split("::")
          ?.map((filter) => {
            const [column, selected] = filter?.split("=");
            const selectedValues = selected?.split("_");
            return {
              column,
              value: {
                selected: column?.includes("cena")
                  ? [Number(selectedValues[0]), Number(selectedValues[1])]
                  : selectedValues,
              },
            };
          });

        //radimo isto za sort
        const sort_tmp = (sort ?? "_")?.split("_");
        const sortObj = {
          field: sort_tmp[0],
          direction: sort_tmp[1],
        };
        return await LIST(
          isSection
            ? `/products/section/list/${slug}`
            : `/products/category/list/${slug}`,
          {
            page: page,
            limit: limit,
            sort: sortObj,
            filters: selectedFilters_tmp?.every(
              (column) => column?.column !== ""
            )
              ? selectedFilters_tmp
              : [],
            render: render,
          }
        ).then((res) => {
          //na kraju setujemo state za filtere i sort, da znamo koji su selektovani
          if (selectedFilters_tmp?.every((column) => column?.column !== "")) {
            setSelectedFilters(selectedFilters_tmp);
          }
          setSort(sortObj);
          setIsLoadingMore(false);
          setPage(page);
          return res?.payload;
        });
      } catch (error) {
        return error;
      }
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje proizvoda na detaljnoj strani
export const useProduct = ({ slug, id, categoryId }) => {
  return useSuspenseQuery({
    queryKey: ["productBasicData", id ? id : null],
    queryFn: async () => {
      return await GET(
        `/product-details/basic-data/${slug}?categoryId=${categoryId}`
      ).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

export const useProductThumb = ({ id, categoryId }) => {
  return useSuspenseQuery({
    queryKey: [
      "productThumb",
      {
        id: id,
      },
    ],
    queryFn: async () => {
      return await GET(
        `/product-details/thumb/${id}?categoryId=${categoryId}`
      ).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje galerije na detaljnoj strani
export const useProductGallery = ({ slug, id }) => {
  return useSuspenseQuery({
    queryKey: ["productGallery", { slug: slug, id: id ? id : null }],
    queryFn: async () => {
      return await GET(`/product-details/gallery/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje breadcrumbs na detaljnoj strani
export const useProductBreadcrumbs = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productBreadcrumbs", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/breadcrumbs/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje opisa na detaljnoj strani
export const useProductDescription = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productDescription", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/description/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje specifikacija na detaljnoj strani
export const useProductSpecification = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productSpecification", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/specification/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje deklaracije na detaljnoj strani
export const useProductDeclaration = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productDeclaration", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/declaration/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje related artikala na detaljnoj strani
export const useRelatedProducts = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productDeclaration", { slug: slug }],
    queryFn: async () => {
      return await LIST(`/product-details/recommended/${slug}`, {
        render: false,
      }).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje related artikala na detaljnoj strani
export const useUpsell = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productDeclaration", { slug: slug }],
    queryFn: async () => {
      return await LIST(`/product-details/up-sell/${slug}`, {
        render: false,
      }).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje related artikala na detaljnoj strani
export const useCrossSell = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productDeclaration", { slug: slug }],
    queryFn: async () => {
      return await LIST(`/product-details/cross-sell/${slug}`, {
        render: false,
      }).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje svih artikala u korpi
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return await LIST(`/cart`).then((res) => res?.payload ?? []);
    },
    refetchOnWindowFocus: false,
  });
};

export const useForm = (initialValues) => {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  return {
    data,
    setData,
    errors,
    setErrors,
  };
};

//hook za zavrsetak kupovine, proslediti formData
export const useCheckout = ({ formData, setPostErrors, setLoading }) => {
  const [cart, mutateCart] = useCartContext();
  return useMutation({
    mutationKey: [{ keys: formData, cart: cart }],
    mutationFn: async () => {
      return await POST(`/checkout/one-page`, formData)
        .then((res) => {
          setLoading(true);
          if (res?.code === 200) {
            mutateCart();
          } else {
            setPostErrors({
              fields: res?.response?.data?.payload?.fields ?? [],
            });
          }
          return res?.payload;
        })
        .catch((err) => {
          return err;
        });
    },
  });
};

//hook za dobijanje info o cenama,popustima itd u korpi
export const useSummary = ({ items }) => {
  return useSuspenseQuery({
    queryKey: ["summary", { items: items }],
    queryFn: async () => {
      return await GET(`/checkout/summary`).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje info o porudzbini, proslediti order_token
export const useOrder = ({ order_token }) => {
  return useSuspenseQuery({
    queryKey: ["order", { order_token: order_token }],
    queryFn: async () => {
      return await GET(`/checkout/info/${order_token}`).then(
        (res) => res?.payload
      );
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje novih proizvoda
export const useNewProducts = () => {
  return useSuspenseQuery({
    queryKey: ["newProducts"],
    queryFn: async ({ render = true }) => {
      return await LIST(`/products/new-in/list`, { render: render }).then(
        (res) => res?.payload
      );
    },
    refetchOnWindowFocus: false,
  });
};

//hook za kontakt
export const useContact = () => {
  return useMutation({
    mutationKey: ["contact"],
    mutationFn: async ({ form }) => {
      return await POST(`/contact/contact_page`, form).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success(`Uspešno poslato.`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          default:
            toast.error("Greška prilikom slanja.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
      });
    },
  });
};

export const useLogin = () => {
  const { login } = useContext(userContext);

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      return await POST(`/customers/sign-in/login`, {
        email: email,
        password: password,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success("Uspešno ste se prijavili.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            login(res?.payload?.customer_token);
            break;
          default:
            toast.error(res?.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
        return res;
      });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async ({ email }) => {
      return await POST(`/customers/sign-in/forgot-password`, {
        email: email,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success("Uspešno! Proverite svoj email.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          default:
            toast.error(res?.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
        return res;
      });
    },
  });
};

export const useCreateAccount = () => {
  return useMutation({
    mutationKey: ["createAccount"],
    mutationFn: async (data) => {
      return await POST(`/customers/sign-in/registration`, { ...data }).then(
        (res) => {
          switch (res?.code) {
            case 200:
              toast.success("Uspešno ste se registrovali.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              break;
            default:
              toast.error(res?.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              break;
          }
          return res;
        }
      );
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return await POST(`/customers/profile/logout`).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success("Uspešno ste se odjavili.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          default:
            toast.error(res?.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
        return res;
      });
    },
  });
};

export const useGetAccountData = (api, method = "get") => {
  return useSuspenseQuery({
    queryKey: ["accountData", api, method],
    queryFn: async () => {
      switch (method) {
        case "get":
          return await GET(`${api}`)?.then((res) => {
            if (res) {
              return res?.payload;
            } else {
              return null;
            }
          });
        case "list":
          return await LIST(`${api}`)?.then((res) => {
            if (res) {
              return res?.payload?.items;
            } else {
              return null;
            }
          });
      }
    },
  });
};

export const useUpdateAccountData = (api, message) => {
  const query_client = useQueryClient();
  return useMutation({
    mutationKey: ["accountData", api],
    mutationFn: async (data) => {
      return await POST(`${api}`, {
        ...data,
      })?.then((res) => {
        switch (res?.code) {
          case 200:
            toast.success(message ?? "Uspešno ste ažurirali podatke.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            query_client?.invalidateQueries({ queryKey: ["accountData"] });
            break;
          default:
            toast.error(res?.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
      });
    },
  });
};

export const useDeleteAccountData = (api, keys, message) => {
  const { invalidateBadges } = useInvalidateBadges();
  return useMutation({
    mutationKey: ["accountData", api],
    mutationFn: async (data) => {
      return await DELETE(`${api}/${data?.id}`, { ...data })?.then((res) => {
        switch (res?.code) {
          case 200:
            toast.success(message ?? "Uspešno ste obrisali podatke.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            invalidateBadges([...keys]);
            break;
          default:
            toast.error(res?.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
      });
    },
  });
};

export const useBillingAddresses = (enabled) => {
  return useSuspenseQuery({
    queryKey: ["billing_addresses"],
    queryFn: async () => {
      return await GET(`/checkout/ddl/billing_addresses`)
        ?.then((res) => {
          if (res) {
            return res?.payload;
          } else {
            return [];
          }
        })
        ?.catch((err) => {
          return err;
        });
    },
    enabled: enabled,
  });
};

export const useShippingAddresses = () => {
  return useSuspenseQuery({
    queryKey: ["shipping_addresses"],
    queryFn: async () => {
      return await GET(`/checkout/ddl/shipping_addresses`)
        ?.then((res) => {
          if (res) {
            return res?.payload;
          } else {
            return [];
          }
        })
        ?.catch((err) => {
          return err;
        });
    },
  });
};

export const useGetAddress = (id, type, enabled) => {
  return useQuery({
    queryKey: ["address", id, type],
    queryFn: async () => {
      return await GET(`/checkout/${type}/${id}`)?.then((res) => {
        if (res && res?.code === 200) {
          return (res?.payload ?? [])?.map((item) => {
            return Object.keys(item).reduce((acc, key) => {
              acc[`${key}_${type}`] = item[key];
              return acc;
            }, {});
          });
        } else {
          return [];
        }
      });
    },
    enabled: enabled,
  });
};

//hook za azuriranje kolicine artikla u korpi
export const useUpdateCartQuantity = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["updateCartQuantity"],
    mutationFn: async ({ id, quantity, message = true }) => {
      return await PUT(`/checkout`, {
        countable: true,
        cart_items_id: id,
        quantity: quantity,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            if (message) {
              toast.success("Količina ažurirana", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
            break;
          default:
            toast.error(res?.payload?.message ?? "Došlo je do greške!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
  });
};

export const useIsLoggedIn = () => {
  return useSuspenseQuery({
    queryKey: ["isLoggedIn"],
    queryFn: async () => {
      return await GET(`/customers/sign-in/login-status`)?.then((res) => {
        if (res?.payload) {
          return res?.payload?.status;
        } else {
          return false;
        }
      });
    },
  });
};

export const useAddPromoCode = () => {
  return useMutation({
    mutationKey: ["addPromoCode"],
    mutationFn: async ({ promo_codes }) => {
      return await POST(`/checkout/promo-code`, {
        promo_codes: promo_codes,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success("Uspešno ste dodali promo kod", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          default:
            toast.error(res?.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
        return res;
      });
    },
  });
};

export const usePromoCodesList = () => {
  return useQuery({
    queryKey: ["promoCodeList"],
    queryFn: async () => {
      return await LIST(`/checkout/promo-code`).then((res) => {
        return res?.payload;
      });
    },
  });
};

export const useRemovePromoCode = () => {
  return useMutation({
    mutationKey: ["promoCodeDelete"],
    mutationFn: async ({ id_promo_code }) => {
      return await DELETE(`/checkout/promo-code/${id_promo_code}`).then(
        (res) => {
          switch (res?.code) {
            case 200:
              toast.success(res?.payload?.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              break;
            default:
              toast.error(res?.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              break;
          }
        }
      );
    },
  });
};

export const usePromoCode = () => {
  return useQuery({
    queryKey: ["promoCodeDelete"],
    queryFn: async ({ id_promo_code }) => {
      return await LIST(`/checkout/promo-code/${id_promo_code}`).then((res) => {
        return res?.payload;
      });
    },
  });
};

export const usePromoCodeOptions = () => {
  return useQuery({
    queryKey: ["promoCodeOptions"],
    queryFn: async () => {
      return await GET(`/checkout/promo-code-options`).then((res) => {
        return res?.payload;
      });
    },
  });
};

export const useStaticPage = (slug) => {
  return useSuspenseQuery({
    queryKey: ["staticPage", slug],
    queryFn: async () => {
      return await GET(`/static-pages/content/${slug}`).then((res) => {
        return res?.payload;
      });
    },
  });
};
