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

// type InitialProps = PromiseSettledResult<typeof getInitialProps>

export default function Home(props: any) {
  const Router = useRouter();
const currentLanguage = Router.locale as string;
  let { articles, allArticles,lastArticle} = props;

  const paginationData = articles?.meta?.pagination;

  const { state, loadArticles } = useHomeLogic(paginationData, currentLanguage,allArticles,articles);
 
console.log("latestId",lastArticle?.data[0])


  return (
    <Layout draft={[]} showHeader={true}  showLoginHeader={false}>
     <Box w="100%"  pl="7%" pr="7%" >
        <BlogHeader></BlogHeader>
        <LatestNews
          latestArticle={lastArticle?.data[0]}
          estimateArticleReadTime={estimateArticleReadTime}
        />
        <OtherArticle
          articleIdToExclude={lastArticle?.data[0]?.id}
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

  const lastArticle = await api.get(`/api/articles?locale=${locale}&populate=*&sort=createdAt&:DESC&pagination[start]=0&pagination[limit]=1`)
  const lastArtcilesId = lastArticle.data.data[0]?.id;
  const articles =   await api.get(`/api/articles?locale=${locale}&populate=*&pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&filters[id][$ne]=${lastArtcilesId}`)
  const allArticles = await api.get(`/api/articles?locale=${locale}&populate=*&filters[id][$ne]=${lastArtcilesId}`)
  
  

  return {
    props: {
      articles: articles?.data,
      allArticles: allArticles.data,
      lastArticle:lastArticle.data,
     ...(await serverSideTranslations(locale, ['common']))
    },
   
  };
};
