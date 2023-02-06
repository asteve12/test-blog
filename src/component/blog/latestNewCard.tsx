import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"
import { BlogAuthCard } from "../../shared/blogAuthorCard"
import { BlogTitle } from "../../shared/blogTitlteCard"
import { TimerCard } from "../../shared/TimeCard"



type ILatestNews = {
    estimateArticleReadTime: (article: string) => number , 
    latestArticle:any
}





export const LatestNews = ({latestArticle,estimateArticleReadTime}:ILatestNews) => {
  
    const Base_url = process.env.NEXT_PUBLIC_STRAPI_API_URL
     const author = latestArticle?.attributes?.author?.data?.attributes?.name
    const authorImage = latestArticle?.attributes?.authorImage?.data?.attributes?.url
    const articleImage = latestArticle?.attributes?.image?.data?.attributes?.url
    const articleContent = latestArticle?.attributes?.content
    const articleTitle = latestArticle?.attributes?.title
    const slug = latestArticle?.attributes?.slug
    const timeToRead:number = estimateArticleReadTime(articleContent)  
    


    return (<Link href={`/articles/${slug}`}>
    
        <Flex w="100%" pl={["0%", "5%"]} pr={["0%", "5%"]} mt="80px" justifyContent="center"  alignItems="center"
            flexDirection={["column", "column",null,"row"]} >
        <Image
            width={["100%","100%","552px"]}
            height={["60%","352px"]}
            borderRadius="8px"
            src={`${Base_url}${articleImage}`} alt="" />
        <Box  ml={["0px","20px"]} mt={["20px"]} width={["100%","560px"]}  >
            <Flex justifyContent="space-between" mb="15px">
                <BlogTitle title={articleTitle}></BlogTitle>
                <TimerCard timetoRead={timeToRead?.toString()}></TimerCard>
            </Flex>
            <Heading fontWeight="900" fontSize={["18px","44px"]} mb="15px"  fontFamily="satoshi bold">
                {articleTitle}
              
            </Heading>
            <Text noOfLines={5} fontWeight="400"  mb="15px" fontSize={["14px","18px"]} color="#666481" fontFamily="satoshi">
            {articleContent}
            </Text>
            <BlogAuthCard  authorImage={authorImage} authorName={author}></BlogAuthCard>
        </Box>


    </Flex>
    </Link>
       )
}