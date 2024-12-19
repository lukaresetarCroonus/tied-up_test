import { get, list } from "@/app/api/api";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import ProductMobileDetails from "../ProductMobileDetails/ProductMobileDetails";
import { headers } from "next/headers";

const getProduct = (slug) => {
  return get(`/product-details/basic-data/${slug}`).then((res) => res?.payload);
};

const getProductGallery = (slug) => {
  return get(`/product-details/gallery/${slug}`).then(
    (res) => res?.payload?.gallery
  );
};
const getProductStickers = (slug) => {
  return get(`/product-details/gallery/${slug}`).then(
    (res) => res?.payload?.stickers
  );
};

const getProductLongDescription = (slug) => {
  return get(`/product-details/description/${slug}`).then(
    (res) => res?.payload
  );
};

const getBreadcrumbs = (slug, categoryId) => {
  return get(
    `/product-details/breadcrumbs/${slug}?categoryId=${categoryId}`
  ).then((res) => res?.payload);
};

const getSpecification = (slug) => {
  return get(`/product-details/specification/${slug}`).then(
    (res) => res?.payload
  );
};

const getDeclaration = (slug) => {
  return get(`/product-details/declaration/${slug}`).then(
    (res) => res?.payload
  );
};
const ProductPage = async ({ path, categoryId, id }) => {
  const [
    product,
    productGallery,
    desc,
    breadcrumbs,
    specification,
    declaration,
    stickers,
  ] = await Promise.all([
    getProduct(id),
    getProductGallery(id),
    getProductLongDescription(id),
    getBreadcrumbs(id, categoryId),
    getSpecification(id),
    getDeclaration(id),
    getProductStickers(id),
  ]);

  const canonical = headers()?.get("x-pathname");

  return (
    <div className="">
      <ProductDetails
        product={product}
        productGallery={productGallery}
        desc={desc}
        path={path}
        breadcrumbs={breadcrumbs}
        specification={specification}
        declaration={declaration}
        stickers={stickers}
        canonical={canonical}
        id={id}
      />
    </div>
  );
};

export default ProductPage;
