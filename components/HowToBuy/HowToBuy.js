"use client";
import Image from "next/image";
import kakokupiti1 from "@/assets/Images/kakokupiti_1.jpg";
import kakokupiti2 from "@/assets/Images/kakokupiti_2.jpg";
import kakokupiti3 from "@/assets/Images/kakokupiti_3.jpg";

const HowToBuy = () => {
  return (
    <div className="md:w-[60%] mx-auto max-md:w-[95%] max-md:mx-auto mt-[1.2rem] md:mt-[9rem]">
      <h1 className="text-[1.313rem] text-center pb-10 max-md:text-[1rem] font-bold text-[#191919]">
        KAKO KUPITI
      </h1>

      <p>
        U gornjem delu naše stranice nalazi meni sa{" "}
        <span className="font-bold">glavnim kategorijama proizvoda (1)</span> .
        Klikom na neku kategoriju, otvoriće se podmeni sa potkategorijama.
        Klikom na potkategoriju, odlazite na stranicu sa proizvodima gde je
        potrebno da kliknete na njegovu sliku ili naziv proizvoda.
      </p>
      <p className="mb-4">
        Takođe, Ukoliko za određeni proizvod imate šifru artikla, uvek možete
        iskoristiti <span className="font-bold">polje za pretragu (2)</span>{" "}
        koje se nalazi u gornjem desnom uglu.
      </p>
      <Image src={kakokupiti1} alt="" width={1600} height={900} />

      <p className="mt-8">
        Pojaviće Vam se stranica sa{" "}
        <span className="font-bold">detaljnim informacijama (3)</span> o
        proizvodu koji Vas zanima.
      </p>
      <p className="mb-4">
        Ukoliko je to proizvod koji želite da poručite kliknite na dugme{" "}
        <span className="font-bold">DODAJ U KORPU (4)</span> .
      </p>
      <Image src={kakokupiti2} alt="" width={1600} height={900} />

      <p className="mt-8 mb-4">
        Nakon završenog dodavanja željenih proizvoda u korpu, ulaskom u korpu
        popunjavate Vaše{" "}
        <span className="font-bold">
          informacije (5) o dostavi, načinu dostave i načinu plaćanja
        </span>
        .
      </p>
      <Image src={kakokupiti3} alt="" width={1600} height={900} />
      <p>
        Kada proverite da li su svi artikli naručeni kako želite i kliknete na
        dugme <span className="font-bold">POTVRDI PORUDŽBENICU (6)</span> time
        ste završili Vaš proces naručivanja na našem shopu.
      </p>
    </div>
  );
};

export default HowToBuy;
