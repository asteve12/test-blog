import { extractTextFromHtmlStringToText } from '@/utils/extractText';
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
  console.log("authorImage",latestArticle?.attributes?.authorImage)
  const author = latestArticle?.attributes?.author;
  const authorImage = latestArticle?.attributes?.authorImage;
  const articleImage = latestArticle?.attributes?.image;
  const articleContent = extractTextFromHtmlStringToText(latestArticle?.attributes?.content);
  const articleTitle = latestArticle?.attributes?.title;
  const slug = latestArticle?.attributes?.slug;
   const summary = latestArticle?.attributes?.summary
  const category = latestArticle?.attributes?.category
  const timeToRead: number = estimateArticleReadTime(articleContent);

return (
    <Link href={`/articles/${slug}`}>
      <Flex
        
        boxSizing='border-box'
        w="100%"
         pl={["0px","0px",'3%', '2%']}
        //pr={['0%',null,null, '3%']}
        mt="80px"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={['column', 'column', null, 'row']}
      >
        <Image
          width={['100%', '100%', '100%','552px']}
          h={['280px',null,null, '323px']}
          borderRadius="8px"
          src={`${articleImage}`}
          alignSelf="left"
          alt=""
          objectFit="cover"
        />
        <Box   ml={['0px', "0px", "0px", '20px']}  pl="10px"
          mt={['20px']} width={['100%', '100%', '100%', '50%']}>
          <Heading fontWeight="900" noOfLines={2}
            color="#2D2B4A"
            fontSize={["1.8rem","2.8rem",'3.8rem', '4.4rem']}
            mb="15px" fontFamily="satoshi black">
            <Flex w="100%" justifyContent="space-between" display={["none","flex"]} mb="15px">
            <BlogTitle title={category}></BlogTitle>
            <TimerCard timetoRead={timeToRead?.toString()}></TimerCard>
          </Flex>
            {articleTitle}
          </Heading>
          <Text
            noOfLines={2}
            fontWeight="400"
            mb="15px"
            fontSize={['1.4rem',"1.6rem","2rem", '1.8rem']}
            color="#666481"
            fontFamily="satoshi"
            // textAlign={["center","center","left","left"]}
          >
            {summary}
          </Text>
          <BlogAuthCard authorImage={authorImage} authorName={author}></BlogAuthCard>
        </Box>
      </Flex>
    </Link>
  );
};
