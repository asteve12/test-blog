import { Button, Flex, Heading, Image } from "@chakra-ui/react"





export const PreviewHeader = () => {
    

    return (
        <Flex  justifyContent="space-between"  w="100%" pl="5%" pr="5%" pt="1%"  pb="1%">

            <Image w="92px" src="/images/preview/redLogo.svg"></Image>
             <Button fontSize="16px" colorScheme="none" w="173px" border="solid 1px #EA445A" h="56px" bg="white" color="#EA445A" borderRadius="200px" >Add New Article</Button>
            
</Flex>
    
    )
}