import localFont from "@next/font/local"


//@ts-ignore
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

//@ts-ignore
import qs from 'qs';

import '@/styles/globals.css';


//testEditorstyle
import "../styles/editorStyle.css"

//footer
import '../styles/footer.css';
//community style
import '../styles/community.css';
//nav
import '../styles/nav.css';
import { api } from '@/axios';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { usePreventHydrationError } from '@/hooks/usePreventHydrationError';
import { SessionProvider } from "next-auth/react";
import Seo from "@/component/seo";


const myFont = localFont({src:"../assets/fonts/Satoshi_Complete/Fonts/OTF/Satoshi-Regular.otf"})

function App({ Component, pageProps }: AppProps) {
  const { data, session,article} = pageProps;
  const title = article?.attributes?.title;
  const summary =  article?.attributes?.summary;
  const imagePath = article?.attributes?.image
  const articleContent = article?.attributes?.content;

  const seo = {
    metaTitle: title,
    metaDescription: summary,
    shareImage: imagePath,
    article: articleContent
  };
  
  const Router = useRouter()
  console.log("Router",Router,session)
  console.log("pageProps",pageProps)

  const favIconsPath = data?.data?.attributes?.favicon?.data?.attributes?.url;
  const { initialise } = usePreventHydrationError();

  if (!initialise) return <></>;
  // if(Router.pathname === "/admin" &&  session)

  return (
    <SessionProvider  session={session}>
    <ChakraProvider>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${favIconsPath}`}
        />
        <Seo {...seo} />
      </Head>
      <main className={myFont.className}>
      <Component {...pageProps} />
      </main>
      
      </ChakraProvider>
      </SessionProvider>
  );
}
//@ts-ignore
// App.getInitialProps = async () => {
//   const queryParameter = {
//     populate: {
//       favicon: '*',
//       defaultSeo: {
//         populate: '*'
//       }
//     }
//   };

//   const res = await api.get(`/api/global/?${qs.stringify(queryParameter)}`);

//   return {
//     pageProps: {
//       data: res.data
//     }
//   };
// };

export default appWithTranslation(App);
