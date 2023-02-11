import { Box, HStack, Text,IconButton } from "@chakra-ui/react"
import { Header } from "./Header"
import Link from "next/link"
//icons
import {IoIosArrowBack} from "react-icons/io"
import { BlogForm } from "./form"





export const Main = () => {
    
    return (<Box bg="#fbfbfd" w="100%" minH="100vh"  pl="30px" pr="30px">
        <Header></Header>
        <Link href="/admin">
        <HStack gap="10px" mb="15px">
            <IconButton colorScheme="none" border="1px solid #E5E5E5"  borderRadius="50px" bg="none" aria-label="Take me backTake me back" icon={<IoIosArrowBack  color="#666481" size={25}></IoIosArrowBack>}>
             </IconButton>
            <Text
                fontWeight="700"
                color="#666481"
                fontSize="16px">Take me back</Text>
        </HStack>
       </Link>
        

        <BlogForm></BlogForm>
        
    </Box>)
}