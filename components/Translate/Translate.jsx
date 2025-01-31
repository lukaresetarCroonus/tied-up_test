"use client";
import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const Translate = () => {
  const baseLanguage = "/auto/sr-Lat";
  const languages = [
    { label: `SR`, value: "/auto/sr-Lat", shortLabel: "SR" },
    { label: "EN", value: "/auto/en", shortLabel: "EN" },
  ];
  const [selected, setSelected] = useState(baseLanguage);

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "auto",
          autoDisplay: false,
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
      const translateBar = document.querySelector(".skiptranslate");
      translateBar.style.display = "none";
      translateBar.style.visibility = "hidden";
      translateBar.style.height = "0px";
      translateBar.style.width = "0px";
      translateBar.style.overflow = "hidden";
      translateBar.style.position = "absolute";
      translateBar.style.left = "-9999px";
      translateBar.style.top = "-9999px";
    };
    if (hasCookie("googtrans")) {
      setSelected(getCookie("googtrans"));
    } else {
      setSelected(baseLanguage);
    }
    let addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const langChange = (value) => {
    if (value === baseLanguage) {
      setCookie("googtrans", "", { path: "/", domain: ".tiedup.rs" });
      setCookie("googtrans", "", { path: "/" });
      setSelected(value);
    } else {
      setCookie("googtrans", `${value}`, { path: "/", domain: ".tiedup.rs" });
      setCookie("googtrans", `${value}`, { path: "/" });
      setSelected(value);
    }
    window.location.reload();
  };

  return (
    <>
      <div
        id="google_translate_element"
        style={{
          width: "0px",
          height: "0px",
          position: "absolute",
          left: "50%",
          zIndex: -99999,
        }}
      ></div>{" "}
      <div className="notranslate flex items-center gap-3 custom-select-container">
        <select
          className="custom-select rounded-lg border-none text-base font-light text-black focus:ring-0 cursor-pointer bg-transparent"
          onChange={(e) => langChange(e.target.value)}
          value={selected}
        >
          {/* <option className='bg-transparent text-white azosansserif font-normal'>{selected?.split('/')[selected?.split('/').length - 1] || 'SRB'}</option> */}

          {languages.map((language) => (
            <option
              key={language.value}
              onChange={() => langChange(language.value)}
              value={language.value}
              className="text-black bg-white font-normal"
            >
              {language.label}
            </option>
          ))}
        </select>
        <div className="custom-arrow"></div>
      </div>
    </>
  );
};

export default Translate;
