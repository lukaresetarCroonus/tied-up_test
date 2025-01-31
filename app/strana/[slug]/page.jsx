import { Static } from "@/_pages/static";
import { get } from "@/app/api/api";
import { headers } from "next/headers";

const StaticPage = ({ params: { slug } }) => {
  return <Static slug={slug} />;
};

export default StaticPage;

const getSEO = (slug) => {
  return get(`/static-pages/seo/${slug}`).then((response) => response?.payload);
};

export const generateMetadata = async ({ params: { slug } }) => {
  const data = await getSEO(slug);

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
