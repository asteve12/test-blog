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

<NextSeo
title={SEO.metaTitle}
description={SEO.metaDescription}

      openGraph={{
        type: 'website',
        //url: 'https://www.example.com/page',
        title: SEO.metaTitle,
        description: SEO.metaDescription,
        images: [
          {
            url: SEO.shareImage,
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
          },
          
        ],
      }}
    />

{/* <title>{SEO.metaTitle}</title>
          <meta property="og:title" content={SEO.metaTitle} />
         <meta name="description" content={SEO.metaDescription} />
        <meta property="og:image" content={SEO.shareImage} />
      
          <meta property="og:type" content="article" /> */}
    {/* twitter meta tags */}
         {/* <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@gruvetickets" />
<meta name="twitter:title" content={SEO.metaTitle}/>
<meta name="twitter:description" content={SEO.metaDescription}/>
      <meta name="twitter:image" content={SEO.shareImage}/> */}
        
 

  
 
 
       
      {/* <meta name="twitter:creator" content="@username"/> */}

  
      
    </>
  );
};

export default Seo;
