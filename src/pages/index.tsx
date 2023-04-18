import Head from 'next/head';

import { Box, Button, Skeleton } from '@chakra-ui/react';
import { LatestNews } from '../component/blog/latestNewCard';
import Seo from '@/component/seo';
import { OtherArticle } from '../component/blog/otherArticle';
import { BlogHeader } from '../component/blog/BlogHeader/BlogHeader';
import { Layout } from '../layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
//utils
import { estimateArticleReadTime } from '@/util/estimateReadTime';
//api
import { api } from '@/axios';
import { useRouter } from 'next/router';
import { useHomeLogic } from '@/hooks/homeLogic';



export default function Home(props: any) {
  const Router = useRouter();
const currentLanguage = Router.locale as string;
  let { articles, allArticles,featuredArticle} = props;

  const paginationData = articles?.meta?.pagination;

  const { state, loadArticles } = useHomeLogic(paginationData, currentLanguage,allArticles,articles);
 



  return (
    <Layout draft={[]} showHeader={true}  showLoginHeader={false}>
     <Box w="100%"  pl="7%" pr="7%" >
        <BlogHeader></BlogHeader>
        <LatestNews
          latestArticle={featuredArticle?.data[0]}
          estimateArticleReadTime={estimateArticleReadTime}
        />
        <OtherArticle
          articleIdToExclude={featuredArticle?.data[0]?.id}
          loading={state.loading}
          error={state.error}
          errorMessage={state.message}
          initialArticle={state?.articles}
          articles={articles?.data}
          loadArticles={loadArticles}
          paginationLimit={state?.paginationData?.limit as number}
          totalArticleCreated={state?.paginationData?.total as number}
          showLoadMoreButton={state.showLoadMoreBtn}
        ></OtherArticle>
      </Box>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }: any) => {
  const paginationStart = 0;
  const paginationLimit = 9;

  let featuredArticle;
  featuredArticle = await api.get(`/api/articles?locale=${locale}&populate=*&filters[featured][$eq]=Yes`)
  if (featuredArticle.data.data.length === 0) featuredArticle = await api.get(`/api/articles?locale=${locale}&populate=*&sort=id:desc`);


  const featuredArticleId = featuredArticle.data.data[0]?.id;
  const articles =   await api.get(`/api/articles?locale=${locale}&populate=*&pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&filters[id][$ne]=${featuredArticleId}`)
  const allArticles = await api.get(`/api/articles?locale=${locale}&populate=*&filters[id][$ne]=${featuredArticleId}`)
  
  

  return {
    props: {
      articles: articles?.data,
      allArticles: allArticles.data,
      featuredArticle:featuredArticle.data,
     ...(await serverSideTranslations(locale, ['common']))
    },
   
  };
};
