import { Box, Image, Flex, VStack, Text,HStack, Heading } from "@chakra-ui/react"
import { BlogTitle } from "@/shared/blogTitlteCard"
import { TimerCard } from "@/shared/TimeCard"
import { CustomIcons } from "@/util/customIcon"
//icons
import { GrFacebookOption } from "react-icons/gr"
import { GrTwitter } from "react-icons/gr"
import { AiFillLinkedin } from "react-icons/ai"
import { RiWhatsappFill } from "react-icons/ri"
import { estimateArticleReadTime } from "@/util/estimateReadTime"
//styles
import styles from "./style/content.module.css"







type Content = {
   BannerImg: string,
    blogHeader: string,
    blogContent:string
}






export const Content = ({ BannerImg, blogHeader, blogContent }: Content) => {
    console.log("Asteve12",blogContent)

    const timeToRead = estimateArticleReadTime(blogContent)
    const socials = [{
        name: "facebook",
        icons:GrFacebookOption
    },
    {
        name: "twitter",    
        icons:GrTwitter
        },
        {
            name: "linkedIn",
            icons:AiFillLinkedin
        },
        {
            name: "whatsapp",
            icons:RiWhatsappFill
        }


        
    ]


  


    return (
        <Box  w="100%"  pt="1%" pl="5%" pr="5%" bg="#fbfbfd"  h="100%">
            <Image  w="1216px"  h="420px"  borderRadius="16px"  objectFit="cover"  maxW="100%" alt="preview" src={BannerImg}></Image>
            <Flex>
            <VStack pl="5%" pt="30px"  gap="10px">
                    <Text color="#666481" fontWeight="700"  fontSize="20px">
                        Share
                        </Text>
                        {
                            socials.map((eachIcons) => <CustomIcons
                                style={{
                                    color: "#666481",
                                    fontSize:"25px"
                                }}
                                Icon={eachIcons.icons} ></CustomIcons>)
                        }
                </VStack>
                

                <Box pl="5%" pt="30px">
                    <HStack>
                        <BlogTitle  title={blogHeader}></BlogTitle>
                        <TimerCard timetoRead={timeToRead}></TimerCard>
                    </HStack>
                    <Box    className="blogContainer"   dangerouslySetInnerHTML={{ __html: blogContent }}/>

                

                   
                </Box>
            </Flex>
        
        </Box>
    )
}