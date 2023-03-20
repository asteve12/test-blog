import { Box, Flex, Heading,SimpleGrid,Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';


type ISuggestedArticle = {
  otherArticles: React.ReactNode;
  loadArticles:(paginationInterval:number, totalRelatedArticleAvailable:number,articleIdToExclude:number)=> void
  paginationInterval: number,
  articleIdToExclude: number,
  totalRelatedArticleAvailable: number,
  totalArticleCreated:number
  

};

export const SuggestedArticle = ({
  totalRelatedArticleAvailable, articleIdToExclude,
  paginationInterval,
  otherArticles,
  totalArticleCreated,
  loadArticles }: ISuggestedArticle) => {
  const { t } = useTranslation('common');


  const loadMoreBtn = (
    <Button
      onClick={() => loadArticles(paginationInterval,totalArticleCreated,articleIdToExclude)}
      mb="30px"
      display="block"
      ml="auto"
      mr="auto"
      fontSize="16px"
      w={["100%","130px","130px","130px"]}
      height="50px"
      rounded="25px"
      color="#666481"
      bg="transparent !important"
      border="1px solid #E1E1E8"
      
      
    >
      {t('blog.loadmore')}
    </Button>
  );

  console.log("otherArticles",otherArticles,paginationInterval)

  return (
    <Box w="100%">
{/* @ts-ignore */}
{otherArticles?.length > 0 &&  <Heading
        mt="70px"
        fontWeight="900"
        fontFamily="satoshi black"
        color="#2D2B4A"
        fontSize={["30px","44px"]}
        textAlign="center"
        mb="60px"
      >
        {t('blogDetails.suggested_article_header')}
      </Heading>}
      

      {/* @ts-ignore */}
      {otherArticles?.length === 2 ? <SimpleGrid spacingX={"10%"}  columns={3}
     >
             {otherArticles}
           </SimpleGrid> :<SimpleGrid
        minChildWidth={["100%", "100%", "389px", "350px"]} spacingX={"50px !important"}
     >
             {otherArticles}
           </SimpleGrid>
        
}
      

      {/* @ts-ignore */}
      {totalArticleCreated-1 > otherArticles?.length  &&  loadMoreBtn}

    </Box>
  );
};
