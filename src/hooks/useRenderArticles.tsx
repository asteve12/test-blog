import React from 'react';

import { ArticleCard } from '@/shared/ArticleCard';
import Link from 'next/link';
//utils
import { estimateArticleReadTime } from '@/util/estimateReadTime';
import { useRouter } from 'next-translate-routes';
import { Box } from '@chakra-ui/react';

//handle display of all articles
export function useRenderArticles(...args: Array<any[]>): React.ReactNode {
  const Router = useRouter();

  if (args.length === 2) {
    const [articles, initialArticle] = args;
    let articlesArray = [...initialArticle];
    if (articles.length > 0) articlesArray = [...articlesArray, ...articles];

    return articlesArray.map((eachArticle) => {
      return (
        <Box w={["100%","100%","80%",'389px']} mt="10px" mr={["auto","auto","auto","10px"]} ml={["auto","auto","auto"]} >
          <Link href={`/articles/${eachArticle?.attributes?.slug}`}>
            <ArticleCard
              estimateArticleReadTime={estimateArticleReadTime}
              title={eachArticle?.attributes?.title}
              content={eachArticle?.attributes?.content}
              image={eachArticle?.attributes?.image?.data?.attributes?.url}
              authorName={eachArticle?.attributes?.author?.data?.attributes?.name}
              authorImage={eachArticle?.attributes?.authorImage?.data?.attributes?.url}
            ></ArticleCard>
          </Link>
        </Box>
      );
      // return (
      //      )
    });
  } else {
    const [otherArticle] = args;
    if (otherArticle.length > 0) {
      return otherArticle.map((eachArticle) => {
        console.log('hash122', `/${Router.locale}/articles/${eachArticle?.attributes?.slug}`);
        return (
          <Box  w={["100%","100%","80%",'389px']} mr={["0px","20px"]} >
                      

            <Link href={`/articles/${eachArticle?.attributes?.slug}`}>
              <ArticleCard
                estimateArticleReadTime={estimateArticleReadTime}
                title={eachArticle?.attributes?.title}
                content={eachArticle?.attributes?.content}
                image={eachArticle?.attributes?.image?.data?.attributes?.url}
                authorName={eachArticle?.attributes?.author?.data?.attributes?.name}
                authorImage={eachArticle?.attributes?.authorImage?.data?.attributes?.url}
              ></ArticleCard>
            </Link>
          </Box>
        );
      });
    }
  }
}
