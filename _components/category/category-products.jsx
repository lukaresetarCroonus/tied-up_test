"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
import { Thumb } from "@/_components/shared/thumb";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/_components/pagination";
import {
  useCategoryProducts,
  useCategoryFilters,
  useIsMobile,
} from "@/hooks/croonus.hooks";
import FiltersMobile from "@/components/sections/categories/FilterMobile";
import Filters from "@/components/sections/categories/Filters";
import { CategoryLongDescription } from "@/_components/category/category-long-description";

export const CategoryProducts = ({
  filters,
  strana,
  sortDirection,
  sortField,
  allFilters = [],
  slug,
  isSection,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const is_mobile = useIsMobile();

  const [productsPerView, setProductsPerView] = useState(4);
  const [productsPerViewMobile, setProductsPerViewMobile] = useState(2);

  useEffect(() => {
    setProductsPerView(is_mobile ? 2 : 4);
  }, [is_mobile]);

  const [filterOpen, setFilterOpen] = useState(false);
  const [isBeingFiltered, setIsBeingFiltered] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // params from URL
  const filterKey = params?.get("filteri");
  const pageKey = Number(params?.get("strana"));
  const sortKey = params?.get("sort");

  const [page, setPage] = useState(strana ?? 1);

  const [sort, setSort] = useState({
    field: sortField ?? "",
    direction: sortDirection ?? "",
  });

  const [selectedFilters, setSelectedFilters] = useState(filters ?? []);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState(allFilters ?? []);
  const [changeFilters, setChangeFilters] = useState(false);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState("");

  const updateURLQuery = (sort, selectedFilters, page) => {
    let sort_tmp;
    let filters_tmp;
    let page_tmp;

    if (sort?.field !== "" && sort?.direction !== "") {
      sort_tmp = `${sort?.field}_${sort?.direction}`;
    }

    if (selectedFilters?.length > 0) {
      filters_tmp = selectedFilters
        ?.map((filter) => {
          const selectedValues = filter?.value?.selected?.join("_");
          return `${filter?.column}=${selectedValues}`;
        })
        .join("::");
    } else {
      filters_tmp = "";
    }

    if (page > 1) {
      page_tmp = page;
    } else {
      page_tmp = 1;
    }

    return { sort_tmp, filters_tmp, page_tmp };
  };

  const generateQueryString = (sort_tmp, filters_tmp, page_tmp) => {
    let queryString = `?${filters_tmp ? `filteri=${filters_tmp}` : ""}${
      filters_tmp && (sort_tmp || page_tmp) ? "&" : ""
    }${sort_tmp ? `sort=${sort_tmp}` : ""}${sort_tmp && page_tmp ? "&" : ""}${
      page_tmp > 1 ? `strana=${page_tmp}` : ""
    }`;

    router.push(queryString, { scroll: false });
    return queryString;
  };

  useEffect(() => {
    const { sort_tmp, filters_tmp, page_tmp } = updateURLQuery(
      sort,
      selectedFilters,
      page
    );

    generateQueryString(sort_tmp, filters_tmp, page_tmp);
  }, [sort, selectedFilters, page]);

  const { data, error, isError, isFetching, isFetched } = useCategoryProducts({
    slug,
    page: strana ?? 1,
    limit: 8,
    sort: sortKey ?? "_",
    setSelectedFilters: setSelectedFilters,
    filterKey: filterKey,
    setSort: setSort,
    render: false,
    setIsLoadingMore: () => {},
    setPage: setPage,
    isSection: isSection,
  });

  const mutateFilters = useCategoryFilters({
    slug,
    page,
    limit: 8,
    sort,
    selectedFilters: tempSelectedFilters,
    isSection: isSection,
  });

  useEffect(() => {
    if (filters?.length > 0) {
      mutateFilters.mutate({
        slug,
        selectedFilters: tempSelectedFilters,
        lastSelectedFilterKey,
        setAvailableFilters,
        availableFilters,
      });
    }
  }, []);

  useEffect(() => {
    mutateFilters.mutate({
      slug,
      selectedFilters: tempSelectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
    });
  }, [tempSelectedFilters?.length]);

  useEffect(() => {
    // Add overflow-hidden class to the body when filterOpen is true
    if (filterOpen) {
      document.body.style.overflow = 'hidden'; // This disables scrolling
    } else {
      document.body.style.overflow = 'auto'; // This restores scrolling
    }

    // Clean up on component unmount
    return () => {
      document.body.style.overflow = 'auto'; // Ensure scroll is enabled on unmount
    };
  }, [filterOpen]); 

  const RenderItems = () => {
    return (data?.items || [])?.map(({ id }) => {
      return (
        <Suspense
          key={id}
          fallback={
            <div
              className={`aspect-square w-full h-full bg-slate-200 animate-pulse`}
            />
          }
        >
          <Thumb
            key={id}
            id={id}
            categoryId={slug}
            refreshWishlist={() => {}}
          />
        </Suspense>
      );
    });
  };

  return (
    <>
      <div
        className={
          filterOpen
            ? `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white translate-x-0 duration-500`
            : `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white -translate-x-full duration-500`
        }
      >
        <Suspense>
          <FiltersMobile
            selectedFilters={selectedFilters}
            availableFilters={availableFilters}
            setSelectedFilters={setSelectedFilters}
            sort={sort}
            setPage={setPage}
            setSort={setSort}
            changeFilters={changeFilters}
            pagination={data?.pagination}
            setProductsPerView={setProductsPerViewMobile}
            productsPerView={productsPerViewMobile}
            setFilterOpen={setFilterOpen}
            setTempSelectedFilters={setTempSelectedFilters}
            setChangeFilters={setChangeFilters}
            tempSelectedFilters={tempSelectedFilters}
            setLastSelectedFilterKey={setLastSelectedFilterKey}
          />
        </Suspense>
      </div>
      <div
        className={`${
          selectedFilters?.length > 0
            ? `mx-[3%] mt-[4.125rem] flex flex-wrap items-center gap-[0.25rem]`
            : `hidden`
        }`}
      >
        {selectedFilters?.map((filter) => {
          const splitFilter = filter?.column?.split("|");
          const filterName = splitFilter?.[1];
          return (
            <div
              className={`font-normal bg-croonus-2 text-white text-[0.65rem] relative max-md:text-[0.7rem]  rounded-lg flex items-center gap-2`}
            >
              <div className={`flex items-center gap-2  px-1`}>
                <p>
                  {filterName?.charAt(0).toUpperCase() + filterName?.slice(1)}:
                </p>
                <span>
                  {filter?.value?.selected?.map((item, index, arr) => {
                    const isLastItem = index === arr.length - 1;
                    return `${filterName === "cena" ? item + "RSD" : item}${
                      isLastItem ? "" : ","
                    }`;
                  })}
                </span>
              </div>
              <div
                onClick={() => {
                  const newSelectedFilters = tempSelectedFilters.filter(
                    (item) => item.column !== filter.column
                  );
                  setTempSelectedFilters(newSelectedFilters);
                  setSelectedFilters(newSelectedFilters);
                  setChangeFilters(true);
                  if (tempSelectedFilters.length === 1) {
                    window.history.replaceState(
                      null,
                      "",
                      singleCategory
                        ? `/kategorije/${singleCategory.link?.link_path}`
                        : `/sekcija/${slug}`
                    );
                  }
                }}
                className={`bg-croonus-2 cursor-pointer  self-stretch h-full flex-1 right-0  rounded-r-lg flex items-center flex-col justify-center`}
              >
                <i
                  className={`fa fa-solid  fa-trash text-[0.65rem] text-white cursor-pointer py-[0.35rem] px-1 hover:text-red-500`}
                  onClick={() => {
                    const newSelectedFilters = tempSelectedFilters.filter(
                      (item) => item.column !== filter.column
                    );
                    setSelectedFilters(newSelectedFilters);
                    setChangeFilters(true);
                    setIsBeingFiltered(true);
                    if (tempSelectedFilters.length === 1) {
                      window.history.replaceState(
                        null,
                        "",
                        singleCategory
                          ? `/kategorije/${singleCategory.link?.link_path}`
                          : `/sekcija/${slug}`
                      );
                    }
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      <div className="max-md:hidden mt-[67px]">
        <Suspense>
          <Filters
            selectedFilters={selectedFilters}
            availableFilters={availableFilters}
            setSelectedFilters={setSelectedFilters}
            sort={sort}
            setPage={setPage}
            setSort={setSort}
            changeFilters={changeFilters}
            pagination={data?.pagination}
            setProductsPerView={setProductsPerView}
            productsPerView={productsPerView}
            setTempSelectedFilters={setTempSelectedFilters}
            setLastSelectedFilterKey={setLastSelectedFilterKey}
            setChangeFilters={setChangeFilters}
          />
        </Suspense>
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

      <div className={`max-md:hidden`}>
        <div
          className={`mt-[1.875rem] px-2 md:px-[3rem] ${
            productsPerView === 2 && "md:!w-[calc(50%+8rem)] mx-auto"
          } grid grid-cols-${productsPerView} gap-x-5 gap-y-10`}
        >
          {RenderItems()}
        </div>
      </div>

      <div className={`md:hidden`}>
        <div
          className={`mt-[1.875rem] px-2 md:px-[3rem] grid grid-cols-${productsPerViewMobile} gap-x-5 gap-y-10`}
        >
          {RenderItems()}
        </div>
      </div>

      <Suspense>
        <Pagination
          data={data}
          page={page}
          slug={slug}
          setPage={setPage}
          selectedFilters={selectedFilters}
        />
      </Suspense>
      <CategoryLongDescription slug={slug} />
    </>
  );
};
