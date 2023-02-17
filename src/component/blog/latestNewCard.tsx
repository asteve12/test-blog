import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { BlogAuthCard } from '../../shared/blogAuthorCard';
import { BlogTitle } from '../../shared/blogTitlteCard';
import { TimerCard } from '../../shared/TimeCard';

type ILatestNews = {
  estimateArticleReadTime: (article: string) => number;
  latestArticle: any;
};

export const LatestNews = ({ latestArticle, estimateArticleReadTime }: ILatestNews) => {
  const Base_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const author = latestArticle?.attributes?.author;
  const authorImage = latestArticle?.attributes?.authorImage;
  const articleImage = latestArticle?.attributes?.image;
  const articleContent = latestArticle?.attributes?.content;
  const articleTitle = latestArticle?.attributes?.title;
  const slug = latestArticle?.attributes?.slug;
  const timeToRead: number = estimateArticleReadTime(articleContent);


  console.log("articleImage",latestArticle)

  return (
    <Link href={`/articles/${slug}`}>
      <Flex
        w="100%"
        pl={['0%', '0%']}
        pr={['0%', '3%']}
        mt="80px"
        justifyContent="center"
        alignItems="center"
        flexDirection={['column', 'column', null, 'row']}
      >
        <Image
          width={['100%', '100%', '80%','552px']}
          height={['60%', '352px']}
          borderRadius="8px"
          src={`${articleImage}`}
          alignSelf="left"
          alt=""
          objectFit="cover"
        />
        <Box ml={['0px', '20px']} mt={['20px']} width={['100%', '100%', '80%','552px']}>
          <Heading fontWeight="900"  noOfLines={2} fontSize={['18px','18px',"30px", '44px']} mb="15px" fontFamily="satoshi black">
            <Flex justifyContent="space-between" display={["none","flex"]} mb="15px">
            <BlogTitle title={articleTitle}></BlogTitle>
            <TimerCard timetoRead={timeToRead?.toString()}></TimerCard>
          </Flex>
            {articleTitle}
          </Heading>
          <Text
            noOfLines={2}
            fontWeight="400"
            mb="15px"
            fontSize={['14px', '18px']}
            color="#666481"
            fontFamily="satoshi"
            // textAlign={["center","center","left","left"]}
          >
            {articleContent}
          </Text>
          <BlogAuthCard authorImage={authorImage} authorName={author}></BlogAuthCard>
        </Box>
      </Flex>
    </Link>
  );
};
