/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    NAME: process.env.NAME,
    ADDRESS: process.env.ADDRESS,
    PIB: process.env.PIB,
    EMAIL: process.env.EMAIL,
    TELEPHONE: process.env.TELEPHONE,
    TELEPHONE2: process.env.TELEPHONE2,
    MB: process.env.MB,
    PIB: process.env.PIB,
    WORKTIME: process.env.WORKTIME,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    INSTAGRAM: process.env.INSTAGRAM,
    SHOW_CHECKOUT_SHIPPING_FORM: process.env.SHOW_CHECKOUT_SHIPPING_FORM,
  },
  images: {
    domains: [
      "scontent.cdninstagram.com",
      "api.tiedup.croonus.com",
      "video.cdninstagram.com",
      "192.168.1.223",
      "api.akt.croonus.com",
    ],
    minimumCacheTTL: 60 * 60 * 24 * 90,
  },
  redirects: async () => {
    return [
      {
        source: "/product-category/bow-ties",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/gde-kupiti-tied-up-proizvode",
        destination: "/gdekupiti",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/gallery",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/shop",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/product-category/cartoons",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/product-category/muvies-series",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/product-category/retro",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/oznaka-proizvoda/filmovi-serije-leptir-masne",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/product-tag/retro-ties",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/kategorija-proizvoda/kasmir",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/product-tag/men",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/rs",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
