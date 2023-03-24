import { Box, Flex, Heading, Button,SimpleGrid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SkeletonAnime } from './skeleton';
//hooks
import { useRenderArticles } from '@/hooks/useRenderArticles';
import { useConditionallyRenderElement } from '@/hooks/useConditionallyRenderedElement';
import { ReactNode } from 'react';

type OtherArticle = {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  articles: any[];
  initialArticle: any[];
  loadArticles: (paginationLimit: number, totalArticleCreated: number,articleIdToExclude:number) => void;
  paginationLimit: number;
  totalArticleCreated: number;
  showLoadMoreButton: boolean;
  articleIdToExclude: number,

};

export const OtherArticle = ({
  loading,
  error,
  errorMessage,
  articles,
  initialArticle,
  loadArticles,
  paginationLimit,
  totalArticleCreated,
  showLoadMoreButton,
  articleIdToExclude,

}: OtherArticle) => {
  const { t } = useTranslation('common');

  
  
  const allArticles = useRenderArticles(articles, initialArticle);
  //console.log("test34",allArticles.length > paginationLimit,allArticles.length,paginationLimit)

  //@ts-ignore
  const ifArticleIsNotAvailable = allArticles!.length === 0;
  
  if (ifArticleIsNotAvailable) return <Box mb="30px"  mt="30px"></Box>
  

  const loadMoreBtn = (
    <Button
      onClick={() => loadArticles(paginationLimit, totalArticleCreated, articleIdToExclude)}
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
  const displayLoadMoreBtn = useConditionallyRenderElement(loadMoreBtn,showLoadMoreButton) as ReactNode;
  console.log("allArticles", allArticles)
 
  return (
    <Box mt={["50px",null,null,"100px"]}   w="100%" pl="1%"    >

       {/* @ts-ignore */}
       {allArticles.length > 0 &&  <Heading
        color="#2D2B4A"
        mb={["25px",null,null,"50px"]}
        fontSize={["2.4rem",'3rem',"3.9rem" ,'4.4rem']}
        fontWeight="900"
        fontFamily="satoshi black"
        textAlign={["left","center","center","center"]}
        
      >
        {t('blog.otherArticle_header')}
      </Heading>}
      
      {/* @ts-ignore */}
     
      { allArticles.length === 2 ? <Flex
        
        flexWrap="wrap"
        justifyContent={["center","left"]}
      >
        {/* @ts-ignore */}
        {allArticles.map((eachArticle) => <Box
          w={["100%", "100%", "100%", '389px']}
          mr={["0px", "0px", "auto", "20px"]}
          ml={["0%","0%","5%","0%"]}>{eachArticle}</Box>)}
        </Flex> :<SimpleGrid
        
        minChildWidth={["100%", "100%", "389px", "350px"]} spacingX={"50px !important"}
        >
                {allArticles}
        </SimpleGrid> }
      

      <div>
    
      </div>
     {/* @ts-ignore */}
      {totalArticleCreated > paginationLimit && totalArticleCreated !== allArticles.length && displayLoadMoreBtn}
    </Box>
  );
};
