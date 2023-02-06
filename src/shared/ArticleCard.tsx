import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { BlogAuthCard } from "./blogAuthorCard"
import { BlogTitle } from "./blogTitlteCard"
import { TimerCard } from "./TimeCard"




type ArticleCard = {
    title: string,
    content: string,
    image: string,
    authorName: string,
    authorImage: string,
    estimateArticleReadTime:(article:string)=>void
    
}


export const ArticleCard = ({
    title,
    content,
    image,
    authorName,
    authorImage,
    estimateArticleReadTime

}: ArticleCard) => {
    const Base_Url = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
     const timeToRead = estimateArticleReadTime(content)  
  
    return (
        <Box w={["95%","95%","389px"]} h="542px"    >
            <Image w={"100%"} objectFit="cover" h={["50%","323px"]} borderRadius="16px" src={`${Base_Url}${image}`}/> 
            <Flex justifyContent="space-between" display={["none","flex"]} mt="10px"  w="100%" >
                <BlogTitle title={title}></BlogTitle>
                <TimerCard timetoRead={timeToRead}/>
            </Flex>

            <Heading fontFamily="satoshi bold" mt="10px" mb="10px"  fontSize={["18px","24px"]} fontWeight="900">
                {title}

            </Heading>
            <Box mb="12px" h="50px">
                <Text
                    noOfLines={2}
                  
                    
                    fontFamily="satoshi"
                    mb="10px"
                    fontSize="14px"
                    color="#666481"
                    textAlign="left">
            {content}
            </Text>
            </Box>
            
            
      
            <BlogAuthCard authorName={authorName} authorImage={authorImage}></BlogAuthCard>
            
           
            
    </Box>
)

}