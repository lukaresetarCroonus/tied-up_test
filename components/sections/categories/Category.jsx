import { list, post, get } from "@/app/api/api";
import CategoryPage from "./CategoryPage";
import { notFound } from "next/navigation";

const getProductsFromCategory = async (path) => {
  return await list(`/products/category/list/${path}`).then(
    (res) => res?.payload
  );
};

const getCategoryFilters = async (path) => {
  return await post(`/products/category/filters/${path}`).then(
    (res) => res?.payload
  );
};

const getSingleCategory = async (path) => {
  return await get(`/categories/product/single/${path}`).then(
    (res) => res?.payload
  );
};

const Category = async ({ path }) => {
  const products = await getProductsFromCategory(path);
  const filters = await getCategoryFilters(path);
  const category = await getSingleCategory(path);
  return (
    <>
      {category ? (
        <CategoryPage
          products={products}
          filter={filters}
          singleCategory={category}
        />
      ) : (
        notFound()
      )}
    </>
  );
};

export default Category;
