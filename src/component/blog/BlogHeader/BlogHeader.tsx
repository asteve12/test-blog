import { Box, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

export const BlogHeader = () => {
  const { t } = useTranslation('common');

  return (
    <Box>
      <Heading
        fontFamily="satoshi bold"
        mt="30px"
        maxW="1000px"
        fontWeight="900"
        ml="auto"
        mr="auto"
        fontSize={['5rem', '5rem', '9rem']}
        color="#2D2B4A"
        textAlign="center"
      >
        {t('blog.blogHeader_1')} {'&'} {t('blog.blogHeader_2')}
      </Heading>
      <Text
        textAlign="center"
        fontSize="2em"
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
