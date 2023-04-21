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

<title>{SEO.metaTitle}</title>
          <meta property="og:title" content={SEO.metaTitle} />
          {/* <meta name="twitter:title" content={SEO.metaTitle} /> */}
          <meta name="description" content={SEO.metaDescription} />
          <meta property="og:description" content={SEO.metaDescription} />
          {/* <meta name="twitter:description" content={SEO.metaDescription} /> */}
          <meta property="og:image" content={SEO.shareImage} />
          {/* <meta name="twitter:image" content={SEO.shareImage} /> */}
          <meta name="image" content={SEO.shareImage} />
          <meta property="og:type" content="article" />
         {/* <meta name="twitter:card" content={SEO.shareImage} /> */}

         {/* twitter meta tags */}
         <meta name="twitter:title" content="Gruve"/>
        <meta name="twitter:description" content="Decentralized event creation and attending platform. Find the event that suits you and enjoy them with maximum security and privacy"/>
        <meta name="twitter:image" content={SEO.shareImage}/>
        <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content="https://gruve.events/"/>
      {/* <meta name="twitter:creator" content="@username"/> */}

  
      
    </>
  );
};

export default Seo;
