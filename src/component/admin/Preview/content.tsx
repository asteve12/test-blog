import { Box, Image, Flex, VStack, Text,HStack, Heading,Stack} from "@chakra-ui/react"
import { BlogTitle } from "@/shared/blogTitlteCard"
import { TimerCard } from "@/shared/TimeCard"
import { CustomIcons } from "@/util/customIcon"
//icons
import { GrFacebookOption } from "react-icons/gr"
import { GrTwitter } from "react-icons/gr"
import { AiFillLinkedin } from "react-icons/ai"
import { RiWhatsappFill } from "react-icons/ri"
import { estimateArticleReadTime } from "@/util/estimateReadTime"








type Content = {
   BannerImg: string,
    blogHeader: string,
    blogContent: string,
    summary: string,
    category:string
}


const styles = {
    previewHeaderStyle: {
        
        marginBottom: "0px",
        color:"#2D2B4A",
        textAlign:'left',
        mt:"0px",
        mb:"10px",
        fontFamily:"satoshi black",
        fontWeight:"900",
        fontSize:["4rem",'5rem', '6rem']
        
    },
    previewHeaderSummaryStyle: {
        fontSize: "2rem",
        mb: "20px",
        mt:"10px"
        
    }
}






export const Content = ({ BannerImg, blogHeader, blogContent,summary,category }: Content) => {
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
        <Box w="100%"
            pt="1%" pl="5%" pr="5%"
            bg="#fbfbfd" minH="100vh">
            <Box
                w="100%"
                paddingTop="40%"
                position="relative"
            
                boxSizing="border-box"
                
                
            >

                <Image
                    position="absolute"
                    top="0" 
                    bottom= "0"
                    left= "0"
                    right ="0"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    borderRadius="10px"
              //h={["250px", "320px", "420px", "100%"]}
                //paddingBottom="66.7%"
                //borderRadius="16px" objectFit="cover"
                    //maxW="100%"
                    alt="preview"
                src={BannerImg}></Image>
            </Box>
           
            <Flex
             w="100%"
             flexDirection={['column-reverse', 'column-reverse','column-reverse' ,'row']}
             alignItems={['start','start', 'start']}
             justifyContent={['start', null]}
             pl={["0px","0px","2%"]}
             pt="30px"
             position="relative"
             h="auto"
            >
                <Stack
                    ml={["30px"]}
                 position="sticky" top="0px" pl={["0px", "0px", "0%"]} 
                    spacing="25px" direction={['row', 'row', 'row', 'column']} mr="30px"
                    pt="30px"
                >
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
                </Stack>
                

                <Box pl="5%" pt="30px">
                   
                    <HStack>
                        <BlogTitle  title={category}></BlogTitle>
                        <TimerCard timetoRead={timeToRead}></TimerCard>
                    </HStack>
                        {/* @ts-ignore */}
                    <Heading  {...styles.previewHeaderStyle as HeadingProps} >{blogHeader}</Heading>
                    <Text   {...styles.previewHeaderSummaryStyle} >{summary}</Text>
                    <Box    className="blogContainer"   dangerouslySetInnerHTML={{ __html: blogContent }}/>

                

                   
                </Box>
            </Flex>
        
        </Box>
    )
}