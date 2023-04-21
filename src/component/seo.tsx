import { NextSeo } from 'next-seo';
import Head from 'next/head';

type ISeo = {
  metaTitle: string;
  metaDescription: string;
  shareImage: string;
  article: string;
};

const Seo = (SEO: ISeo) => {

  console.log('seo details',SEO)
  return (
    <Head>
       <NextSeo
      title={SEO.metaTitle}
      description={SEO.metaDescription}
      //canonical="https://www.canonical.ie/"
      openGraph={{
        url: 'https://www.url.ie/a',
        title: SEO.metaTitle,
        description: SEO.metaDescription,
        images: [
          {
            url: SEO.shareImage,
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
            type: 'image/jpeg',
          },
        
        ],
        siteName: 'SiteName',
      }}
      twitter={{
        handle: '@gruvetickets',
        site: 'https://gruve.events/',
        cardType: 'summary_large_image',
      }}
    />
      {/* {SEO.metaTitle && (
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
      <meta name="twitter:card" content="summary_large_image" /> */}
    </Head>
  );
};

export default Seo;
