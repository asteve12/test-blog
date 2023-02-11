import { Box, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

export const BlogHeader = () => {
  const { t } = useTranslation('common');

  return (
    <Box    pt="50px">
      <Heading
        fontFamily="satoshi black"
         maxW="1000px"
        fontWeight="900"
        ml="auto"
        mr="auto"
        fontSize={['5rem','5rem','4rem',"5rem"]}
        color="#2D2B4A"
        textAlign="center"
      >
        {t('blog.blogHeader_1')} {'&'} {t('blog.blogHeader_2')}
      </Heading>
      <Text
        textAlign="center"
        fontSize={["2.3rem","1.8rem"]}
        fontFamily="satoshi"
        color="#666481"
        fontWeight="400"
        maxW="800px"
        mt="10px"
        ml="auto"
        mr="auto"
      >
        {t('blog.intro_text')}
      </Text>
    </Box>
  );
};
