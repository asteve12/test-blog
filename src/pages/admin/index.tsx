import Head from 'next/head'
//import { Inter } from '@next/font/google'
import { SideBar } from '../../shared/admin/sidebar'
import { Box, Flex,FlexProps } from '@chakra-ui/react'
import { Layout } from '../../layout'
import { HomeMain } from '../../component/admin/Home/Main'
import { api } from '@/axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { WithAuthenticate } from '@/HOC/authenticate'







//const inter = Inter({ subsets: ['latin'] })

 function Home(props: any) {
  
  
  const { allArticles } = props;

  

 
  return (
    <Layout showSideBar={true} showHeader={false} showLoginHeader={true}>
    <HomeMain allArticles={allArticles?.data}></HomeMain>
  </Layout>
  )
}

export default WithAuthenticate(Home)

export const getServerSideProps = async ({ locale }: any) => {
  const paginationStart = 0;
  const paginationLimit = 3;
  const [articles, homeSEO, allArticles] = await Promise.all([
    api.get(
      `/api/articles?locale=${locale}&populate=*&pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&locale=${locale}`
    ),
    api.get(`/api/homepage?locale=${locale}&populate=*`),
    api.get(`/api/articles?locale=${locale}&populate=*`)
  ]);

  return {
    props: {
     
      allArticles: allArticles.data,
      homeSEO: homeSEO?.data,
      ...(await serverSideTranslations(locale, ['common']))
    },
    revalidate: 1
  };
};
