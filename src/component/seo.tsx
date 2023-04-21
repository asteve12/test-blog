
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
         <meta name="description" content={SEO.metaDescription} />
        <meta property="og:image" content={SEO.shareImage} />
      
          <meta property="og:type" content="article" /> 
    {/* twitter meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@gruvetickets" />
<meta name="twitter:title" content={SEO.metaTitle}/>
<meta name="twitter:description" content={SEO.metaDescription}/>
      <meta name="twitter:image" content={SEO.shareImage}/>
        
 

  
 
 
       
      {/* <meta name="twitter:creator" content="@username"/> */}

  
      
    </>
  );
};

export default Seo;
