import { api } from '@/axios';
import { BlogDetailContent } from '@/component/blogDetails/BlogDetailContent';
import { BlogDetailHeader } from '@/component/blogDetails/BlogDetailHeader';
import { SuggestedArticle } from '@/component/blogDetails/suggestedArticle';

// import { ParsedUrlQuery } from "querystring"
import { parseContent } from '@/util/parser';

import { Layout } from '@/layout';
import { Box } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
//utils
import { estimateArticleReadTime } from '@/util/estimateReadTime';
//hooks
import { useRenderArticles } from '@/hooks/useRenderArticles';
import Seo from '@/component/seo';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useArticleDetailsLogic } from '@/hooks/articleDetailsLogic';

type attribute = {
  author: string;
  authorImage: any;
  category: any;
  content: any;
  createdAt: string;
  description: string;
  image: any;
  locale: string;
  localisation: any;
  publishedAt: string;
  slug: string;
  title: string;
  updatedAt: string;
  summary:string
};

type BlogDetailPage = {
  article: { attributes: attribute,id:number };
  otherArticle: attribute[];
  singleArticleCategory: string,
  info:any
};

type GetStaticPathsContext = {
  locales?: string[];
  defaultLocale?: string;
};

const BlogDetails: NextPage<BlogDetailPage> = ({ article,info,otherArticle,singleArticleCategory}: BlogDetailPage) => {
  
  console.log("info",info)
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL as string;
  const articleContent = article?.attributes?.content;
  const category = article?.attributes?.category;
  const title = article?.attributes?.title;
  const summary =  article?.attributes?.summary;
  const timeToRead = estimateArticleReadTime(articleContent);
  const imagePath = article?.attributes?.image
  const totalArticleCreated = info?.meta?.pagination?.total

  const articleDescription = article?.attributes?.description;
  const seo = {
    metaTitle: title,
    metaDescription: articleDescription,
    shareImage: imagePath,
    article: true
  };

  const useArticleDetailsLogicParams = {
    paginationInterval: 3,
    totalRelatedArticleAvailable: totalArticleCreated,
    totalArticleAvailable: otherArticle,
    singleArticleCategory
  }

  const {loadArticles,otherArticleFetched } = useArticleDetailsLogic<typeof otherArticle>(useArticleDetailsLogicParams)

  
    const otherArticleToRead = useRenderArticles(otherArticleFetched);


  return (
    <Layout  draft={[]} showHeader={true} showLoginHeader={false}>
      <Seo {...seo} />
      <Box  w="100%"  pt="30px" pl="7.8%" pr="7%" >
        <BlogDetailHeader baseUrl={baseUrl} imagePath={imagePath}></BlogDetailHeader>
        <BlogDetailContent
          title={title}
          category={category}
          summary={summary}

          content={articleContent}
          timeToRead={timeToRead}
        ></BlogDetailContent>
        <SuggestedArticle
          paginationInterval={3}
          articleIdToExclude={article?.id}
          loadArticles={loadArticles}
          otherArticles={otherArticleToRead}
          totalRelatedArticleAvailable={totalArticleCreated}
          totalArticleCreated={totalArticleCreated}
        ></SuggestedArticle>
      </Box>
    </Layout>
  );
};

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   const { locales } = context;

//   const allArticles = await api.get(`/api/articles/?populate=*`);
//   const path: any[] = [];

//   allArticles?.data?.data?.map((eachArticle: any) => {
//     locales!.map((language: any) => {
//       path.push({
//         params: {
//           slug: eachArticle?.attributes?.slug
//         },
//         locale: language
//       });
//     });
//   });

//   console.log('path', locales);

//   return {
//     paths: path,
//     fallback: "blocking"
//   };
// };
//export const getStaticProps: GetStaticProps
//@ts-ignore
export const getServerSideProps = async ({ locale, params }) => {
  const paginationStart = 1;
  const paginationLimit = 3;


  const  singleArticle = await api.get(`/api/articles?filters[slug][$eq]=${params?.slug}&populate=*&locale=${locale}`)
  

  const singleArticleCategory = singleArticle?.data.data[0]?.attributes?.category
  const otherArticle = await  api.get(`/api/articles?filters[slug][$ne]=${params?.slug}&populate=*&locale=${locale}&pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}`)
  


  const data = singleArticle?.data.data[0];
  if (singleArticle?.data.data[0]?.attributes?.content) {
    singleArticle.data.data[0].attributes.content = singleArticle?.data.data[0]?.attributes?.content
    
  }

  return {
    props: {
      info:otherArticle.data,
      article: data,
      otherArticle: otherArticle.data.data,
      singleArticleCategory,
      locale,
      ...(await serverSideTranslations(locale!, ['common']))
    },
    //revalidate: 1
  };
};

export default BlogDetails;
