import Link from "next/link";
import Image from "next/image";

const Veleprodaja = () => {
  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>Veleprodaja</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          Veleprodaja
        </h1>
        <div className={`mt-10 space-y-3`}>
          <h2 className={`font-bold text-[1.5rem]`}>Za partnere:</h2>
          <p>
            Ako želite da proširite svoj asortiman i postanete partner Tied Up
            brenda, na pravom ste mestu! Nudimo vam jedinstvenu priliku da se
            uključite u dalju distribuciju naših proizvoda širom Sveta.
            Kontaktirajte nas i rado ćemo vas upoznati sa svim detaljima
            saradnje.
          </p>
          <p>
            <span className={`font-bold`}>Prvi korak</span> : Naša veleprodaja
            zahteva osnovne informacije o vama i vašem biznisu kako bismo
            dogovorili sve potrebne uslove. Ukoliko ste zainteresovani za više
            informacija ili imate predlog za drugačiji oblik saradnje, budite
            slobodni i kontaktirajte nas putem:
          </p>
          <ul className={`list-disc pl-5`}>
            <li>
              <span className={`font-bold`}>Email-a:</span>{" "}
              <a href="mailto:masnetiedup@gmail.com">masnetiedup@gmail.com</a>
            </li>
            <li className={`mt-2`}>
              <span className={`font-bold`}>Telefona:</span>{" "}
              <ul className={`list-disc pl-5`}>
                <li>
                  <a href={`tel:062 120 89 85`}>062 120 89 85</a> - Slađan
                  Jevremović
                </li>
                <li>
                  <a href={`tel:063 112 39 88`}>063 112 39 88</a> - Boban
                  Jevremović
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`py-10 space-y-3 border-b`}>
          <h2 className={`font-semibold text-[1.2rem]`}>
            Pogodnosti za firme:
          </h2>
          <ul className={`list-disc pl-5`}>
            <li>
              20% popusta za porudžbine od 10 do 20 istih proizvoda (dezeni mogu
              biti različiti)
            </li>
            <li>
              25% popusta za porudžbine preko 20 istih proizvoda (dezeni mogu
              biti različiti)
            </li>
            <li>Dodatnih 5% popusta za narudžbine preko 200.000 RSD</li>
            <li>3% popusta za avansno plaćanje</li>
          </ul>
          <p>
            Za detalje o našoj veleprodajnoj ponudi, obratite nam se direktno.
          </p>
        </div>

        <div className={`mt-10 space-y-3`}>
          <h2 className={`font-bold text-[1.5rem]`}>Za pojedince:</h2>
          <p>
            Tražite jedinstveni poklon ili želite dodatnu zaradu kroz prodaju
            naših proizvoda? Tied Up vam pruža priliku da ostvarite dodatne
            pogodnosti i rabate, čak i ako nemate firmu. Sve što je potrebno je
            vaša dobra volja i kreativnost!
          </p>
          <ul className={`list-disc pl-5`}>
            <li>
              <span className={`font-bold`}>Email-a:</span>{" "}
              <a href="mailto:masnetiedup@gmail.com">masnetiedup@gmail.com</a>
            </li>
            <li className={`mt-2`}>
              <span className={`font-bold`}>Telefona:</span>{" "}
              <ul className={`list-disc pl-5`}>
                <li>
                  <a href={`tel:062 120 89 85`}>062 120 89 85</a> - Slađan
                  Jevremović
                </li>
                <li>
                  <a href={`tel:063 112 39 88`}>063 112 39 88</a> - Boban
                  Jevremović
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`py-10 space-y-3 border-b`}>
          <h2 className={`font-semibold text-[1.2rem]`}>
            Pogodnosti za pojedince:
          </h2>
          <ul className={`list-disc pl-5`}>
            <li>
              15% popusta za porudžbine preko 10 istih proizvoda (dezeni mogu
              biti različiti)
            </li>
            <li>Posebni rabati i stimulansi za dalju prodaju kroz katalog</li>
          </ul>
          <p>Radujemo se uspešnoj saradnji! </p>
          <p>Tied Up Tim</p>
        </div>
      </div>
    </>
  );
};

export default Veleprodaja;

export const metadata = {
  title: "Veleprodaja | TiedUp",
  description: "Veleprodaja",
};
