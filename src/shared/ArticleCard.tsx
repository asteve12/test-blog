import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { BlogAuthCard } from './blogAuthorCard';
import { BlogTitle } from './blogTitlteCard';
import { TimerCard } from './TimeCard';

type ArticleCard = {
  title: string;
  content: string;
  image: string;
  authorName: string;
  authorImage: string;
  estimateArticleReadTime: (article: string) => void;
};

export const ArticleCard = ({
  title,
  content,
  image,
  authorName,
  authorImage,
  estimateArticleReadTime
}: ArticleCard) => {
  const Base_Url = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  const timeToRead = estimateArticleReadTime(content);

  return (
    <Box  w={['100%', '95%','95%', '389px']} h={['auto', '542px']} mb={['30px', '0px']} ml="auto" mr="auto">
      <Image
        w={'100%'}
        objectFit="cover"
        h={['35%', '323px']}
        borderRadius="5px"
        src={`${Base_Url}${image}`}
      />
      <Flex justifyContent="space-between" display={['none', 'flex']} mt="10px" w="100%">
        <BlogTitle title={title}></BlogTitle>
        <TimerCard timetoRead={timeToRead} />
      </Flex>

      <Heading
        fontFamily="satoshi bold"
        //textAlign={['center', 'center', 'left']}
        mt="10px"
        mb="10px"
        fontSize={['18px', '24px']}
        fontWeight="900"
        w="100%"
      >
        {title}
      </Heading>
      <Box mb="12px" h="50px">
        <Text
          noOfLines={2}
          //textAlign={['center', 'center', 'left']}
          fontFamily="satoshi"
          mb="10px"
          fontSize="14px"
          color="#666481"
        >
          {content}
        </Text>
      </Box>

      <BlogAuthCard authorName={authorName} authorImage={authorImage}></BlogAuthCard>
    </Box>
  );
};
