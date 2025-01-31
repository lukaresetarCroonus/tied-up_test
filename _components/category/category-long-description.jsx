"use client";

import { useCategory } from "@/hooks/croonus.hooks";

export const CategoryLongDescription = ({ slug }) => {
  const { data } = useCategory({ slug });

  if (data) {
    const {
      basic_data: { long_description },
    } = data;

    return (
      <div className={`mt-[1.875rem] px-2 md:px-[3rem]`}>
        <div
          className={`prose font-light max-w-full`}
          dangerouslySetInnerHTML={{ __html: long_description }}
        />
      </div>
    );
  }
};
