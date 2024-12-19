import { list } from "@/app/api/api";
import Thumb from "@/components/Thumb/Thumb";
import Image from "next/image";
import Link from "next/link";

const getNewProducts = async () => {
  return await list(`/products/new-in/list`).then((res) => res?.payload?.items);
};

const NewProductsPage = async () => {
  const newProducts = await getNewProducts();
  return (
    <div className="mx-[0.625rem] max-md:mt-[2rem] mt-[9rem]">
      {newProducts ? (
        <>
          <h1 className="text-2xl font-bold">Novo u ponudi</h1>
          <div className="grid max-md:grid-cols-2 mt-10 gap-y-[40px] md:grid-cols-3 2xl:grid-cols-4 gap-[11px]">
            <Thumb slider={false} data={newProducts} />
          </div>
        </>
      ) : (
        <div className="w-full lg:mt-[13rem] max-md:mt-[13rem] flex flex-col items-center justify-center max-md:w-[95%] mx-auto pt-[500px]">
          <div className="border flex flex-col items-center justify-center gap-5 text-center border-[#f8f8f8] rounded-3xl p-10">
            <h1 className="font-bold text-[18px]">
              Trenutno nema novih proizvoda.
            </h1>
            <h2 className="font-normal text-[15px] mt-3">Proverite kasnije.</h2>
            <Link href="/">
              <button className="bg-[#df6a25] mt-5 px-10 font-medium text-white hover:bg-opacity-80 py-4">
                Vrati se na početnu stranu
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProductsPage;
