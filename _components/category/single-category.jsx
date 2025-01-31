"use client";
import Link from "next/link";
import { useCategory } from "@/hooks/croonus.hooks";
import { generateBreadcrumbSchema } from "@/_functions";

export const SingleCategory = ({ slug, text, path, base_url }) => {
  const { data } = useCategory({ slug });

  const breadcrumbs_schema = generateBreadcrumbSchema(
    data?.parents,
    data?.basic_data?.name,
    path,
    base_url
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs_schema) }}
      />

      <div className="px-5 lg:px-[3rem]">
        {data?.parents?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-5">
            <Link
              href={`/`}
              className={`text-[#191919] text-[0.95rem] font-normal hover:text-[#b89980]`}
            >
              Početna
            </Link>
            <>/</>
            {data?.parents?.map((breadcrumb, index, arr) => {
              return (
                <div key={index} className="flex items-center gap-2">
                  <Link
                    href={`/${breadcrumb?.link?.link_path}`}
                    className="text-[#191919] text-[0.95rem] font-normal hover:text-[#b89980]"
                  >
                    {breadcrumb?.name}
                  </Link>
                  {index !== arr.length - 1 && <>/</>}
                </div>
              );
            })}
            <>/</>
            <p className="text-[#215352] text-[0.95rem] font-semibold">
              {data?.basic_data?.name}
            </p>
          </div>
        )}
      </div>
      <div className="mt-[30px] md:mt-[80px] flex flex-col items-center justify-center px-2 md:px-[3rem]">
        <div className="flex flex-row  items-center justify-center">
          <h1 className="text-[23px] md:text-[29px] font-semibold">
            {data?.basic_data?.name ?? text ?? ""}
          </h1>
        </div>
        <p
          className="text-center max-md:mt-[20px] max-w-full font-light md:mt-[22px]"
          dangerouslySetInnerHTML={{
            __html: data?.basic_data?.short_description,
          }}
        ></p>
        <p
          className="text-center prose max-md:mt-[20px] max-w-full font-light md:mt-[22px] "
          dangerouslySetInnerHTML={{
            __html: data?.basic_data?.description,
          }}
        ></p>
      </div>
    </>
  );
};
