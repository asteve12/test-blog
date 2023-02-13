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
  const { articles, allArticles, homeSEO } = props;
  const paginationData = articles?.meta?.pagination;

  const { state, loadArticles } = useHomeLogic(paginationData, currentLanguage, allArticles);
  const SeoData = {
    metaTitle: homeSEO?.data?.attributes?.seo?.metaTitle,
    metaDescription: homeSEO?.data?.attributes?.seo?.metaDescription,
    shareImage: '',
    article: false
  };

  return (
    <Layout showHeader={true}>
      <Seo {...SeoData} />
      <Box w="100%" pl="6%" pr="6%" >
        <BlogHeader></BlogHeader>
        <LatestNews
          latestArticle={state?.latestArticle}
          estimateArticleReadTime={estimateArticleReadTime}
        ></LatestNews>
        <OtherArticle
          loading={state.loading}
          error={state.error}
          errorMessage={state.message}
          articles={state?.articles}
          initialArticle={articles?.data}
          loadArticles={loadArticles}
          paginationLimit={state?.paginationData?.limit as number}
          totalArticleCreated={state?.paginationData?.total as number}
          showLoadMoreButton={state.showLoadMoreBtn}
        ></OtherArticle>
      </Box>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: any) => {
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
      articles: articles?.data,
      allArticles: allArticles.data,
      homeSEO: homeSEO?.data,
      ...(await serverSideTranslations(locale, ['common']))
    },
    revalidate: 1
  };
};
