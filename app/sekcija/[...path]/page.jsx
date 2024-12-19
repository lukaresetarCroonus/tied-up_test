import CategoryData from "@/components/sections/categories/CategoryPage";
import { CategoryProducts } from "@/_components/category";
import { headers } from "next/headers";

const Section = async ({
  params: { path },
  searchParams: { sort: sortURL, strana, filteri },
}) => {
  let data = {};
  switch (true) {
    case path?.[path?.length - 1] === "preporuceno":
      data.slug = "recommendation";
      data.name = "Preporučeno";
      break;
    default:
      break;
  }

  const sort = (sortURL ?? "_")?.split("_");
  const sortField = sort?.[0];
  const sortDirection = sort?.[1];

  const page = Number(strana) > 0 ? Number(strana) : 1;

  const filters = filteri?.split("::")?.map((filter) => {
    const [column, selected] = filter?.split("=");
    const selectedValues = selected?.split("_");
    return {
      column,
      value: {
        selected: selectedValues,
      },
    };
  });

  let headersList = headers();
  let base_url = headersList?.get("x-base_url");
  return (
    <>
      <h1
        className={`text-[#215352] font-bold text-[30px] mt-[1.875rem] px-2 md:px-[3rem]`}
      >
        {data?.name}
      </h1>
      <CategoryProducts
        slug={data?.slug}
        filters={filters}
        strana={page}
        sortField={sortField}
        sortDirection={sortDirection}
        isSection={true}
        allFilters={[]}
      />
    </>
  );
};

export default Section;

export const metadata = {
  title: "Preporučeno | Tied Up",
  description: "Preporučeni proizvodi",
  keywords: "preporučeni proizvodi",
  robots: {
    index: true,
    follow: true,
  },
};
