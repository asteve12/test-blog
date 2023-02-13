import { Box, Image, Flex, VStack, Text,HStack, Heading } from "@chakra-ui/react"
import { BlogTitle } from "@/shared/blogTitlteCard"
import { TimerCard } from "@/shared/TimeCard"
import { CustomIcons } from "@/util/customIcon"
//icons
import { GrFacebookOption } from "react-icons/gr"
import { GrTwitter } from "react-icons/gr"
import { AiFillLinkedin } from "react-icons/ai"
import { RiWhatsappFill } from "react-icons/ri"









export const Content = () => {
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


    const Blogs = [
        {
            Header: "How to connect a wallet to  a web3 platform",
            Content: `Hosting a successful webinar is not an impossible task once you put the right things in place. When done right, webinars can help build 
            your brand and establish you as an authority
            in your industry. If you’re looking forward
             to hosting a successful webinar, here are some tips to guide you through the process.`,
            
        },
        {
            Header: "How to connect a wallet to  a web3 platform",
            Content: `Hosting a successful webinar is not an impossible task once you put the right things in place. When done right, webinars can help build 
            your brand and establish you as an authority
            in your industry. If you’re looking forward
             to hosting a successful webinar, here are some tips to guide you through the process.`,
            
        },
        {
            Header: "How to connect a wallet to  a web3 platform",
            Content: `Hosting a successful webinar is not an impossible task once you put the right things in place. When done right, webinars can help build 
            your brand and establish you as an authority
            in your industry. If you’re looking forward
             to hosting a successful webinar, here are some tips to guide you through the process.`,
            
        }
    ]


    return (
        <Box  w="100%"  pt="1%" pl="5%" pr="5%" bg="#fbfbfd"  minH="100vh">
            <Image  w="1216px"  h="420px"  borderRadius="16px"  objectFit="cover"  maxW="100%" alt="preview" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe5dr3-AcwXUWan1KdkGnXSynd2QgiOu6pdnYNdrJDjA&s"></Image>
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
                        <BlogTitle  title="What is a defi wallet"></BlogTitle>
                        <TimerCard timetoRead="5"></TimerCard>
                    </HStack>

                    <VStack gap="20px" mt="20px" w="802px">
                        {
                            Blogs.map((eachBlog) => (
                                <Box>
                                    <Heading  fontSize="36px" mb="10px">
                                        {eachBlog.Header}
                                    </Heading>
                                    <Text  color="#666481" fontSize="21px">
                                        {eachBlog.Content}
                                    </Text>
                            </Box>
                            ))
                        }
                </VStack>
                </Box>
            </Flex>
        
        </Box>
    )
}