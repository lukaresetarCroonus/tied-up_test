import { Suspense } from "react";
import NewProductsPage from "@/components/NewProductsPage/NewProductsPage";

const Novo = () => {
  return (
    <Suspense
      fallback={
        <div className="grid max-md:grid-cols-2 gap-y-[40px] md:grid-cols-3 2xl:grid-cols-4 gap-[11px]">
          <>
            {Array.from({ length: 12 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="max-md:h-[250px] h-[500px] w-full col-span-1 bg-slate-300 object-cover animate-pulse"
                />
              );
            })}
          </>
        </div>
      }
    >
      <NewProductsPage />
    </Suspense>
  );
};

export default Novo;

export const metadata = {
  title: "Novo ",
  description: "Dobrodošli na croonus.com Online Shop",
  keywords: [
    "Croonus",
    "online",
    "shop",
    "croonus.com",

    "farmerke",
    "trenerke",
    "dukserice",
    "Croonus obuca",
    "obuca",
    "Croonus online",
  ],
};
