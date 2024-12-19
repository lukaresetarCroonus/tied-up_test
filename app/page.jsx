import IndexSlider from "@/components/IndexSlider/IndexSlider";
import { get, list } from "./api/api";
import RecommendedCategories from "@/components/sections/homepage/RecommendedCategories";
import NewCategoriesSections from "@/components/NewCategoriesSection/NewCategoriesSection";
import NewsLetterInstagramSection from "@/components/NewsLetterInstgramSection/NewsLetterInstagramSection";
import RecommendedProducts from "@/components/sections/homepage/RecommendedProducts";
import AboutUs from "@/components/Aboutus/Aboutus";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";

const getBanners = async () => {
  return await get("/banners/index_slider").then((res) => res?.payload);
};

const getMobileBanners = async () => {
  return await get("/banners/index_slider_mobile").then((res) => res?.payload);
};

const getBannersCategories = async () => {
  return await get("/banners/index-first-banner").then((res) => res?.payload);
};

const getRecommendedProducts = async () => {
  return await list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items
  );
};
const getIndexBanner = async () => {
  return await get("/banners/index_banner").then((res) => res?.payload);
};

const fetchAction4 = async () => {
  return await get("/banners/akcija4").then((response) => response?.payload);
};

const getNew = async () => {
  return await list("/categories/section/recommended").then(
    (res) => res?.payload
  );
};

const Home = async () => {
  const banners = await getBanners();
  const recommendedProducts = await getRecommendedProducts();
  const action4 = await fetchAction4();
  const categories = await getBannersCategories();
  const mobileBanners = await getMobileBanners();
  const recommendedCategories = await getNew();

  let all_headers = headers();
  let base_url = all_headers.get("x-base_url");

  let schema = generateOrganizationSchema(base_url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="block relative overflow-hidden">
        <div className="relative block" id="slider">
          <IndexSlider banners={banners} mobileBanners={mobileBanners} />
        </div>
        <div className="overflow-hidden">
          <RecommendedProducts
            recommendedProducts={recommendedProducts}
            action4={`Preporučujemo`}
          />
        </div>
        <AboutUs />
        <RecommendedCategories categories={categories} />
        <NewCategoriesSections categories={recommendedCategories} />
        <NewsLetterInstagramSection />
      </div>
    </>
  );
};

export default Home;
export const revalidate = 30;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | TiedUp",
    description: data?.meta_description ?? "Dobrodošli na TiedUp Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | TiedUp",
      description:
        data?.social?.share_description ?? "Dobrodošli na TiedUp Online Shop",
      type: "website",
      images: [
        {
          url: data?.social?.share_image ?? "",
          width: 800,
          height: 600,
          alt: "TiedUp",
        },
      ],
      locale: "sr_RS",
    },
  };
};
