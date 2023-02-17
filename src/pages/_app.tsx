import localFont from "@next/font/local"


//@ts-ignore
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

//@ts-ignore
import qs from 'qs';

import '@/styles/globals.css';

//footer
import '../styles/footer.css';
//community style
import '../styles/community.css';
//nav
import '../styles/nav.css';
import { api } from '@/axios';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePreventHydrationError } from '@/hooks/usePreventHydrationError';
import { SessionProvider } from "next-auth/react";


const myFont = localFont({src:"../assets/fonts/Satoshi_Complete/Fonts/OTF/Satoshi-Regular.otf"})

function App({ Component, pageProps }: AppProps) {
  const { data, session } = pageProps;
  const Router = useRouter()
  console.log("Router",Router,session)

  const favIconsPath = data?.data?.attributes?.favicon?.data?.attributes?.url;
  const { initialise } = usePreventHydrationError();

  if (!initialise) return <></>;
  // if(Router.pathname === "/admin" &&  session)

  return (
    <SessionProvider  session={session}>
    <ChakraProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${favIconsPath}`}
        />
      </Head>
      <main className={myFont.className}>
      <Component {...pageProps} />
      </main>
      
      </ChakraProvider>
      </SessionProvider>
  );
}
//@ts-ignore
App.getInitialProps = async () => {
  const queryParameter = {
    populate: {
      favicon: '*',
      defaultSeo: {
        populate: '*'
      }
    }
  };

  const res = await api.get(`/api/global/?${qs.stringify(queryParameter)}`);

  return {
    pageProps: {
      data: res.data
    }
  };
};

export default appWithTranslation(App);
