import { CustomIcons } from "../../../util/customIcon"
import { Box, Card, Flex, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react"
import {RiDeleteBin4Line} from "react-icons/ri"
import { FiEdit } from "react-icons/fi"
import { AiOutlineEye } from "react-icons/ai"
import Link from "next/link"
import { BlogTitle } from "../../../shared/blogTitlteCard"
import { TimerCard } from "../../../shared/TimeCard"




    
//icons







export const BlogCard = () => {


    const CardFooterItems = [

        {
            name: "Delete",
            Icon:RiDeleteBin4Line,
        },
        {
            name: "Edit",
            Icon:FiEdit,
        },
        {
            name: "Preview",
            Icon:AiOutlineEye,
        }
    ]
    
    return (<Card w="364px" h="495px" borderRadius="17px" p="16px">
        <Image
            w="100%"
            h="240px"
            borderRadius="8px"
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZGV8ZW58MHx8MHx8&w=1000&q=80"
        ></Image>
        <Flex justifyContent="space-between" mt="10px">
            
          <BlogTitle  title="What is a defi wallet"></BlogTitle>
            <TimerCard  timetoRead="5"></TimerCard>
        </Flex>

        <Text fontSize="24px"  mt="10px" fontFamily="satoshi" fontWeight="700">
        How to connect a wallet to  a web3 platform
        </Text>
        <Text mt="10px" fontSize="14px" color="#717171">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing posuere quam commodo eu.
        </Text>

        <Stack direction="row" gap="10px" mt="40px" >
            {
                CardFooterItems.map((footerItems) => {

                    if (footerItems.name === "Preview") return <HStack display="flex" alignItems="center">
                    <CustomIcons style={{
                            color: "#666481",
                            display: "flex",
                        alignItems:"center"
                    }} Icon={footerItems.Icon}/>
                        <Link href="/admin/preview">
                        <Text color="#666481"  >
                            { footerItems.name}
                    </Text>
                        </Link>
                   
              </HStack> 
                        
                    return  (
                        <HStack display="flex" alignItems="center">
                        <CustomIcons style={{
                            color:"#666481"
                        }} Icon={footerItems.Icon}/>
                           
                        <Text color="#666481" mt="4px">
                                { footerItems.name}
                        </Text>
                  </HStack>
                    )
                })
            }
           
        </Stack>
        
    </Card>)
}

