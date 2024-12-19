"use client";
import { useState, useEffect } from "react";
import { list, post } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";
import Thumb from "@/components/Thumb/Thumb";
import Filters from "./Filters";
import FiltersMobile from "./FilterMobile";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/sections/categories/Loader";
import LoadingProducts from "@/components/LoadingProducts";

const CategoryPage = ({
  filter,
  singleCategory,
  products,
  text,
  slug,
  sectionSlug,
}) => {
  const params = useSearchParams();
  const router = useRouter();
  // const [productData, setProductData] = useState({
  //   products: products?.items,
  //   pagination: products?.pagination,
  // });
  const [sort, setSort] = useState({ field: "", direction: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [availableFilters, setAvailableFilters] = useState(filter);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState("");

  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    const savedScrollPos = parseInt(localStorage.getItem("scrollPos"), 10);
    if (!isNaN(savedScrollPos)) {
      setLastScrollPos(savedScrollPos);
    }
    const handleScroll = () => {
      const scrollPos = window.pageYOffset;
      setLastScrollPos(scrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data: productData, isFetching } = useQuery({
    queryKey: [
      "products",
      params?.get("strana"),
      limit,
      params?.get("sort"),
      params?.get("filteri"),
      slug,
    ],
    queryFn: async () => {
      // router.refresh();
      let sort_URL = (params?.get("sort") ?? "_")?.split("_");
      const sort_obj = {
        field: sort_URL[0] ?? "",
        direction: sort_URL[1] ?? "",
      };

      let page_URL = Number(params?.get("strana")) ?? 1;

      let filters_URL = (params?.get("filteri") ?? ",").split(",");

      const filters_arr_tmp = filters_URL?.map((filter) => {
        const selectedColumn = filter?.split("=")[0];
        const selectedValues_tmp = filter?.split("=")[1];
        const selectedValues = selectedValues_tmp?.split("_");

        return {
          column: selectedColumn,
          value: {
            selected: selectedValues,
          },
        };
      });

      if (filters_arr_tmp?.some((column) => column?.column)) {
        setSelectedFilters(filters_arr_tmp);
      } else {
        setSelectedFilters([]);
      }
      setPage(page_URL);
      setSort(sort_obj);
      return await list(
        !slug
          ? `/products/category/list/${singleCategory?.id}`
          : `/products/section/list/${slug}`,
        {
          sort: sort_obj ?? sort,
          page: page_URL ?? page,
          limit: limit,
          filters: filters_arr_tmp?.every((column) => column?.column)
            ? filters_arr_tmp
            : [],
        }
      ).then((res) => {
        setChangeFilters(true);
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (changeFilters) {
      post(
        !slug
          ? `/products/category/filters/${singleCategory?.id}`
          : `/products/section/filters/${slug}`,
        {
          filters: tempSelectedFilters,
        }
      ).then((response) => {
        const lastSelectedFilterValues = tempSelectedFilters?.find((item) => {
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
      setChangeFilters(false);
    }
  }, [changeFilters]);

  const [productsPerView, setProductsPerView] = useState(4);
  const [productsPerViewMobile, setProductsPerViewMobile] = useState(2);
  const [filterOpen, setFilterOpen] = useState(false);

  const updateURLQuery = (sort, page, selectedFilters) => {
    let sort_tmp;
    let page_tmp;
    let filters_tmp;

    if (sort?.field !== "" && sort?.direction !== "") {
      sort_tmp = `${sort?.field}_${sort?.direction}`;
    }
    if (page > 1) {
      page_tmp = page;
    }

    if (selectedFilters?.length > 0) {
      filters_tmp = selectedFilters?.map((filter) => {
        const selectedValues = filter?.value?.selected?.join("_");
        return `${filter?.column}=${selectedValues}`;
      });
    } else {
      filters_tmp = "";
    }

    return { sort_tmp, page_tmp, filters_tmp };
  };

  //ne koristiti singleCategory.slug_path, jer dolazi do infinite loop-a, iz razloga sto strana vidi samo poslednji segment, a slug path sadrzi /
  const slug_path = singleCategory?.slug;
  useEffect(() => {
    const { sort_tmp, page_tmp, filters_tmp } = updateURLQuery(
      sort,
      page,
      selectedFilters
    );

    let queryString = "";

    switch (true) {
      case slug:
        switch (true) {
          case sort_tmp && !page_tmp && !filters_tmp:
            queryString = `${sectionSlug}?sort=${sort_tmp}`;

            break;
          case sort_tmp && page_tmp && !filters_tmp:
            queryString = `${sectionSlug}?sort=${sort_tmp}&strana=${page_tmp}`;

            break;
          case sort_tmp && filters_tmp && !page_tmp:
            queryString = `${sectionSlug}?filteri=${filters_tmp}&sort=${sort_tmp}`;

            break;
          case page_tmp && !sort_tmp && !filters_tmp:
            queryString = `${sectionSlug}?strana=${page_tmp}`;

            break;
          case page_tmp && sort_tmp && !filters_tmp:
            queryString = `${sectionSlug}?sort=${sort_tmp}&strana=${page_tmp}`;

            break;
          case filters_tmp && !sort_tmp && !page_tmp:
            queryString = `${sectionSlug}?filteri=${filters_tmp}`;

            break;
          case page_tmp && sort_tmp && filters_tmp:
            queryString = `${sectionSlug}?filteri=${filters_tmp}&sort=${sort_tmp}&strana=${page_tmp}`;

            break;
          case !sort_tmp && !page_tmp && !filters_tmp:
            queryString = sectionSlug;

            break;
          default:
            queryString = sectionSlug;

            break;
        }
        break;
      case !slug:
        switch (true) {
          case sort_tmp && !page_tmp && !filters_tmp:
            queryString = `${slug_path}?sort=${sort_tmp}`;

            break;
          case sort_tmp && page_tmp && !filters_tmp:
            queryString = `${slug_path}?sort=${sort_tmp}&strana=${page_tmp}`;

            break;
          case sort_tmp && filters_tmp && !page_tmp:
            queryString = `${slug_path}?filteri=${filters_tmp}&sort=${sort_tmp}`;

            break;
          case page_tmp && !sort_tmp && !filters_tmp:
            queryString = `${slug_path}?strana=${page_tmp}`;

            break;
          case page_tmp && sort_tmp && !filters_tmp:
            queryString = `${slug_path}?sort=${sort_tmp}&strana=${page_tmp}`;

            break;
          case filters_tmp && !sort_tmp && !page_tmp:
            queryString = `${slug_path}?filteri=${filters_tmp}`;

            break;
          case page_tmp && sort_tmp && filters_tmp:
            queryString = `${slug_path}?filteri=${filters_tmp}&sort=${sort_tmp}&strana=${page_tmp}`;

            break;
          case !sort_tmp && !page_tmp && !filters_tmp:
            queryString = slug_path;

            break;
          default:
            queryString = slug_path;

            break;
        }
        break;

      default:
        break;
    }
    router.push(queryString, { scroll: false });
  }, [sort, selectedFilters, page]);

  const getPaginationArray = (selectedPage, totalPages) => {
    const start = Math.max(1, selectedPage - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div>
      <div className="max-md:hidden mt-[67px]">
        <Filters
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          setPage={setPage}
          setSort={setSort}
          changeFilters={changeFilters}
          pagination={productData?.pagination}
          setProductsPerView={setProductsPerView}
          productsPerView={productsPerView}
          setTempSelectedFilters={setTempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
          setChangeFilters={setChangeFilters}
          filter={filter}
        />
      </div>
      <div
        className={`flex items-center gap-5 w-full px-2 mx-auto mt-[60px] md:hidden bg-white sticky top-[3.4rem] py-2 z-[51]`}
      >
        <button
          className={`flex items-center justify-center text-[0.9rem] md:text-[1.2rem] text-center py-2 flex-1 border`}
          onClick={() => setFilterOpen(true)}
        >
          Filteri
        </button>
        <div className={`flex items-center gap-3`}>
          {/*a div 40px high and 40px wide*/}
          <div
            className={`w-[30px] h-[30px] border-2 ${
              productsPerViewMobile === 1 && "border-black"
            }`}
            onClick={() => setProductsPerViewMobile(1)}
          ></div>
          {/*a div 40px high and 40px wide that has 9 smaller squares inside*/}
          <div
            className={`w-[30px] h-[30px] border grid grid-cols-2 ${
              productsPerViewMobile === 2 && "border-black"
            }`}
            onClick={() => setProductsPerViewMobile(2)}
          >
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <div
                  key={i}
                  className={`col-span-1 border ${
                    productsPerViewMobile === 2 && "border-black"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      {productData?.items?.length > 0 && !isFetching ? (
        <>
          <div className={`max-lg:hidden px-[3rem]`}>
            <div
              className={`mt-[1.875rem] ${
                productsPerView === 2 && "w-[50%] mx-auto"
              } grid grid-cols-${productsPerView} gap-x-5 gap-y-10`}
            >
              <Thumb
                data={productData?.items}
                loading={loading}
                slider={false}
                category={true}
                products={false}
              />
            </div>
          </div>
          <div className={`lg:hidden w-[95%] mx-auto`}>
            <div
              className={`mt-[50px] grid grid-cols-${productsPerViewMobile} md:grid-cols-3 gap-x-[20px] gap-y-[36px]`}
            >
              <Thumb
                data={productData?.items}
                loading={loading}
                slider={false}
                category={true}
                products={false}
                productsPerViewMobile={productsPerViewMobile}
              />
            </div>
          </div>
        </>
      ) : isFetching ? (
        <LoadingProducts />
      ) : (
        <div className="flex items-center justify-center w-full py-10 text-center">
          <h1 className="text-[#191919] text-[1.1rem]">
            U traženoj kategoriji nema proizvoda, ili izabrani filteri ne daju
            rezultate.
          </h1>
        </div>
      )}
      {productData?.pagination?.total_pages > 1 && (
        <div
          className={`flex mt-10 py-2 px-[3rem] bg-[#f2f2f2] items-center justify-end gap-1`}
        >
          {getPaginationArray(
            productData.pagination.selected_page,
            productData.pagination.total_pages
          ).map((num, index, array) => (
            <>
              {index === 0 && num !== 1 && (
                <>
                  <span
                    className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-[#215352] hover:text-[#215352] rounded-lg`}
                    onClick={() => {
                      setPage(1);
                      window.scrollTo(0, 0);
                      setLoading(true);
                    }}
                  >
                    1
                  </span>
                  {num - 1 !== 1 && (
                    <span className={`select-none py-1 px-3 rounded-lg`}>
                      ...
                    </span>
                  )}
                </>
              )}
              {index > 0 && num - array[index - 1] > 1 && (
                <span className={`select-none py-1 px-3 rounded-lg`}>...</span>
              )}
              <span
                className={`${
                  num === productData.pagination.selected_page
                    ? "cursor-pointer select-none bg-[#215352] py-1 px-3 rounded-lg text-white"
                    : "cursor-pointer select-none py-1 px-3 border border-white hover:border-[#215352] hover:text-[#215352] rounded-lg"
                }`}
                onClick={() => {
                  setPage(num);
                  window.scrollTo(0, 0);
                  setLoading(true);
                }}
              >
                {num}
              </span>
              {index === array.length - 1 &&
                num !== productData.pagination.total_pages && (
                  <>
                    {productData.pagination.total_pages - num !== 1 && (
                      <span className={`select-none py-1 px-3  rounded-lg`}>
                        ...
                      </span>
                    )}
                    <span
                      className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-[#215352] hover:text-[#215352] rounded-lg`}
                      onClick={() => {
                        setPage(productData.pagination.total_pages);
                        window.scrollTo(0, 0);
                        setLoading(true);
                      }}
                    >
                      {productData.pagination.total_pages}
                    </span>
                  </>
                )}
            </>
          ))}
        </div>
      )}
      <div
        className={
          filterOpen
            ? `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white translate-x-0 duration-500`
            : `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white -translate-x-full duration-500`
        }
      >
        <FiltersMobile
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          setPage={setPage}
          setSort={setSort}
          changeFilters={changeFilters}
          pagination={productData?.pagination}
          setProductsPerView={setProductsPerView}
          productsPerView={productsPerView}
          setFilterOpen={setFilterOpen}
          setTempSelectedFilters={setTempSelectedFilters}
          setChangeFilters={setChangeFilters}
          tempSelectedFilters={tempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
