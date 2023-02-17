import { ArticleCard } from '@/shared/ArticleCard';
import { Box, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { json } from 'node:stream/consumers';

type ISuggestedArticle = {
  otherArticles: React.ReactNode;
};

export const SuggestedArticle = ({ otherArticles }: ISuggestedArticle) => {
  const { t } = useTranslation('common');

  console.log("otherArticles",otherArticles)

  return (
    <Box w="100%">
      <Heading
        mt="70px"
        fontWeight="900"
        fontFamily="satoshi black"
        color="#2D2B4A"
        fontSize={["30px","44px"]}
        textAlign="center"
        mb="60px"
      >
        {t('blogDetails.suggested_article_header')}
      </Heading>


      <Flex
        
        w="100%" mb="50px"
        justifyContent="space-between" 
        flexWrap="wrap" 
        >
        {otherArticles}
      </Flex>

  

     
      
    </Box>
  );
};
