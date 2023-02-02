import {Box, Flex, Heading, HStack, Image, Text} from "@chakra-ui/react"
import { BlogTitle } from "../../shared/blogTitlteCard"
import { TimerCard } from "../../shared/TimeCard"
import { Socials } from "./socials"





type IBlogDetailContent = {
    title: string,
    content: string,
  timeToRead: number  | void,
   
}



export const BlogDetailContent = ({title,content,timeToRead}:IBlogDetailContent) => {
 
 
    
    return (<Flex w="100%"  >
        <Socials></Socials>
        <Box pt="25px" pl="35px" w="80%"  >
            <HStack gap="10px">
                <BlogTitle title={title}></BlogTitle>
              <TimerCard timetoRead={timeToRead} ></TimerCard>
            </HStack>
            <Box width="100%" >
                <Heading color="#2D2B4A"
                    mt="10px" mb="10px"
                    fontFamily="satoshi bold" fontWeight="900" fontSize={["24px","44px"]}>
                  {title}
                </Heading>
                <Text   fontWeight="400" fontFamily="satoshi"  color="#666481" fontSize="18px" textAlign="left">
                    {content}
                </Text>


            </Box>
           

        </Box>
    </Flex>)
}