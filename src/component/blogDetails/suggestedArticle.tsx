import { Box, Flex, Heading,SimpleGrid,Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';


type ISuggestedArticle = {
  otherArticles: React.ReactNode;
  loadArticles:(paginationInterval:number, totalRelatedArticleAvailable:number,articleIdToExclude:number)=> void
  paginationInterval: number,
  articleIdToExclude: number,
  totalRelatedArticleAvailable:number
  

};

export const SuggestedArticle = ({totalRelatedArticleAvailable,articleIdToExclude,paginationInterval, otherArticles, loadArticles}: ISuggestedArticle) => {
  const { t } = useTranslation('common');


  const loadMoreBtn = (
    <Button
      onClick={() => loadArticles(paginationInterval,totalRelatedArticleAvailable,articleIdToExclude)}
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

  console.log("otherArticles",otherArticles)

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
      

      

      <SimpleGrid
         minChildWidth={["100%", "100%", "389px", "350px"]} spacingX={"50px !important"}
      >
              {otherArticles}
            </SimpleGrid>

      {/* @ts-ignore */}
      {otherArticles?.length >  paginationInterval &&  loadMoreBtn}

    </Box>
  );
};
