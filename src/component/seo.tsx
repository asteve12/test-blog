import { NextSeo } from 'next-seo';
import Head from 'next/head';

type ISeo = {
  metaTitle: string;
  metaDescription: string;
  shareImage: string;
  article: string;
};

const Seo = (SEO: ISeo) => {


  return (
    <>

      {SEO.metaTitle && (
        <>
          <title>{SEO.metaTitle}</title>
          <meta property="og:title" content={SEO.metaTitle} />
          <meta name="twitter:title" content={SEO.metaTitle} />
        </>
      )}
      {SEO.metaDescription && (
        <>
          <meta name="description" content={SEO.metaDescription} />
          <meta property="og:description" content={SEO.metaDescription} />
          <meta name="twitter:description" content={SEO.metaDescription} />
        </>
      )}
      {SEO.shareImage && (
        <>
          <meta property="og:image" content={SEO.shareImage} />
          <meta name="twitter:image" content={SEO.shareImage} />
          <meta name="image" content={SEO.shareImage} />
        </>
      )}
      {SEO.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content={SEO.shareImage} />
    </>
  );
};

export default Seo;
