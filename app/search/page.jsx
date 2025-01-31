import SearchPage from "@/components/SearchPage/SearchPage";
import { Suspense } from "react";

const Search = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default Search;

export const metadata = {
  title: "Pretraga | Fashion Template",
  description: "Pretraga | Fashion Template",
};
