import {withTranslateRoutes} from "next-translate-routes"

//@ts-ignore
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

//@ts-ignore
import qs from "qs"

import '@/styles/globals.css'

//footer
import "../styles/footer.css"
//community style
import "../styles/community.css"
//nav
import "../styles/nav.css"
import { api } from '@/axios'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { usePreventHydrationError } from "@/hooks/usePreventHydrationError"





function App({ Component, pageProps }: AppProps) {
  const { data } = pageProps
 
  const favIconsPath = data?.data?.attributes?.favicon?.data?.attributes?.url
  const{initialise} = usePreventHydrationError()

  
if(!initialise) return<></>

 return <ChakraProvider>
   <Head>
   <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${favIconsPath}`} />
   </Head>
   <Component {...pageProps} />
       
</ChakraProvider>  
}
//@ts-ignore
App.getInitialProps = async () => {
  
  const queryParameter = {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
  }
}
  
  const res = await api.get(`/api/global/?${qs.stringify(queryParameter)}`)


  
  return {
      pageProps: {
      data:res.data,
    }
}
  
}


export default appWithTranslation(App)