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
  loadArticles: (paginationLimit: number, totalArticleCreated: number) => void;
  paginationLimit: number;
  totalArticleCreated: number;
  showLoadMoreButton: boolean;
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
  showLoadMoreButton
}: OtherArticle) => {
  const { t } = useTranslation('common');

  const allArticles = useRenderArticles(articles,initialArticle);
  console.log('allArticles', allArticles);
  

  const loadMoreBtn = (
    <Button
      onClick={() => loadArticles(paginationLimit, totalArticleCreated)}
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

  return (
    <Box mt={["50px",null,null,"100px"]}   w="100%" pl="1%"    >
      <Heading
        color="#2D2B4A"
        mb={["25px",null,null,"50px"]}
        fontSize={["2.4rem",'3rem',"3.9rem" ,'4.4rem']}
        fontWeight="900"
        fontFamily="satoshi black"
        textAlign={["left","center","center","center"]}
        
      >
        {t('blog.otherArticle_header')}
      </Heading>

        {/*minChildWidth={["100%","100%","389px","389px"]} spacing={["0px","15px","15px","6px"]}*/}
      <SimpleGrid spacingX={["42rem"]} columns={[1,1,1,4]}
        //minChildWidth={["100%", "100%", "389px", "389px"]} 
      //minChildWidth={["100%", "100%", "389px", "389px"]} spacing={["0px", null, "0px", "5px"]}
      >
              {allArticles}
      </SimpleGrid>
      
     {displayLoadMoreBtn}
    </Box>
  );
};
