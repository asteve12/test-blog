import { Box, HStack, Text,IconButton } from "@chakra-ui/react"
import { Header } from "./Header"
import Link from "next/link"
//icons
import {IoIosArrowBack} from "react-icons/io"
import { BlogForm } from "./form"


type IMain = {
    profilePics: string,
    username: string,
    featuredArticleId:number
}




export const Main = (props:IMain) => {
    
    return (<Box bg="#fbfbfd" w="100%" minH="100vh"  pl={["0px","0px","10px","30px"]} pr={["12px","12px","12px","30px"]}>
        <Header></Header>
        <Link href="/admin">
        <HStack gap="10px" mb="15px">
                <IconButton colorScheme="none" w="40px" h="40px" border="1px solid #E5E5E5"
                    borderRadius="40px" bg="none" aria-label="Take me backTake me back" icon={<IoIosArrowBack color="#666481" size={25}></IoIosArrowBack>}>
             </IconButton>
            <Text
                fontWeight="700"
                color="#666481"
                fontSize="16px">Take me back</Text>
        </HStack>
       </Link>
        
        <Box w="100%">
        <BlogForm featuredArticleId={props.featuredArticleId} name={props?.username} profilePics={props?.profilePics} />
            
</Box>
       
        
    </Box>)
}