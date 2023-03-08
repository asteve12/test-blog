import React, { useState } from 'react';


import { ArticleCard } from '@/shared/ArticleCard';
import Link from 'next/link';


//utils
import { estimateArticleReadTime } from '@/util/estimateReadTime';
import { useRouter } from 'next-translate-routes';
import { Box } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { extractTextFromHtmlStringToText } from '@/utils/extractText';


//handle display of all articles
export function useRenderArticles(...args: Array<any[]>): React.ReactNode {
  const Router = useRouter();
  const { data, status } = useSession()
  const [type] = args


  if (args.length === 2) {
    const [articles, initialArticle] = args;
    let articlesArray = initialArticle.length > 0 ? [...initialArticle]:[];

    if (articles.length > 0) articlesArray = [...articlesArray, ...articles];;

    return articlesArray.map((eachArticle) => {
      
      return (
        <Box  w={["100%", "100%", "100%", '389px']}  mt="10px"
        mr={["auto", "auto", "auto", "0px"]}
        ml={["auto", "auto", "auto","0px"]}
        >
        
         
          <Link href={`/articles/${eachArticle?.attributes?.slug}`} style={{display:"flex",justifyContent:"center"}}>
            <ArticleCard
              estimateArticleReadTime={estimateArticleReadTime}
              title={eachArticle?.attributes?.title}
              content={extractTextFromHtmlStringToText(eachArticle?.attributes?.content)}
              image={eachArticle?.attributes?.image}
              authorName={eachArticle?.attributes?.author}
              authorImage={eachArticle?.attributes?.authorImage}
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
        
        let content:string ="" ;
            
        
        console.log('hash122', `/${Router.locale}/articles/${eachArticle?.attributes?.slug}`);
        return (
          <Box   w={["100%", "100%", "70%", '389px']} mt="10px"
          mr={[null, null, "auto", "0px"]}
          ml={[null, null, "auto","0px"]}
          
          >
                     

          <Link href={`/articles/${eachArticle?.attributes?.slug}`}>
            <ArticleCard
              estimateArticleReadTime={estimateArticleReadTime}
              title={eachArticle?.attributes?.title}
              content={extractTextFromHtmlStringToText(eachArticle?.attributes?.content)}
              image={eachArticle?.attributes?.image}
              authorName={eachArticle?.attributes?.author}
              authorImage={eachArticle?.attributes?.authorImage}
            ></ArticleCard>
          </Link>
        </Box>
         
        );
      });
    }
  }
}


export const useRenderAdminArticle = (...args:Array<any | void []>) => {
  const [article, deleteArticle, isDeleting] = args
  const [itemIdToDelete, setItemsIdToDelete] = useState<number>()
  

  if (article.length > 0) return article.map((eachArticle: any) => {
    console.log("eachArticle", eachArticle)
    let content:string ="" ;
            
        //(async () => content = await parseContent(eachArticle?.attributes?.content))()
    return (
      <Box  w={["100%", "100%", "90%", '389px']} mt="10px"
      //   w={["100%", "100%", "80%", '389px']} mt="10px"
      // mr={["auto", "auto", "auto", null]}
      // ml={["auto", "auto", "auto"]}
      mr={[null, null, "auto", "0px"]}
      ml={[null, null, "auto","0px"]}
      
      >
         <ArticleCard
          estimateArticleReadTime={estimateArticleReadTime}
          title={eachArticle?.attributes?.title}
          content={extractTextFromHtmlStringToText(eachArticle?.attributes?.content)}
          image={eachArticle?.attributes?.image}
          authorName={eachArticle?.attributes?.author}
          authorImage={eachArticle?.attributes?.authorImage}
          type="admin"
          deleteArticle={deleteArticle}
          id={eachArticle?.id}
          isDeleting={isDeleting}
          slug={eachArticle?.attributes?.slug}
          itemIdToDelete={itemIdToDelete}
          setItemsIdToDelete={setItemsIdToDelete}
        />
     
    </Box>
     
    );
  });


  
}
