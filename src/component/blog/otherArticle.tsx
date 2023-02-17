import { Box, Flex, Heading, Button } from '@chakra-ui/react';
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

  const allArticles = useRenderArticles(articles, initialArticle);
  console.log('allArticles', allArticles);

  const loadMoreBtn = (
    <Button
      onClick={() => loadArticles(paginationLimit, totalArticleCreated)}
      mb="30px"
      display="block"
      ml="auto"
      mr="auto"
      fontSize="16px"
      w="130px"
      height="50px"
      rounded="25px"
      color="#666481"
      bg="transparent !important"
      border="1px solid #E1E1E8"
      
      
    >
      {t('blog.loadmore')}
    </Button>
  );
  const displayLoadMoreBtn = useConditionallyRenderElement(
    loadMoreBtn,
    showLoadMoreButton
  ) as ReactNode;

  return (
    <Box mt="100px" w="100%"  >
      <Heading
        color="#2D2B4A"
        mb="50px"
        fontSize={['18px','34px', '44px']}
        fontWeight="900"
        fontFamily="satoshi black"
        textAlign="center"
      >
        {t('blog.otherArticle_header')}
      </Heading>

      <Flex
        
        w="100%" mb="50px"
        justifyContent="space-between" 
        flexWrap="wrap" 
        >
        {allArticles}
        {loading && <SkeletonAnime></SkeletonAnime>}
      </Flex>

      {displayLoadMoreBtn}
    </Box>
  );
};
