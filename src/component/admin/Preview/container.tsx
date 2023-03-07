import React from "react"
import { Box, Flex, VStack, Button, ChakraProps } from "@chakra-ui/react"
import { Content } from "./content"
import { PreviewHeader } from "./Header"



//styles

const styles = {
    closePreviewStyle: {
        w: "130px",
        h: "22px",
        colorScheme: "none",
        color: "#EA445A",
        border: "solid 1px #EA445A",
        fontSize: "16px",
        borderRadius: "15px",
        padding: "20px",
        mr:"5%"
        
        
    },
    containerStyle: {
        w:"100%",
        h:"100%",
        bg:"#FBFBFD"
        
    }
}


//props


type PreviewContainer = {
    closePreview: React.Dispatch<React.SetStateAction<boolean>>,
    BannerImg: string,
    blogHeader: string,
    blogContent:string
}





export const PreviewContainer = ({closePreview,BannerImg,blogHeader,blogContent}:PreviewContainer) => {

  
    
  console.log("preview",blogContent)

    return (
        <Box   {...styles.containerStyle}>
            {/* <PreviewHeader></PreviewHeader> */}
            <Flex justifyContent="right" >
            <Button  {...styles.closePreviewStyle  as ChakraProps}  onClick={()=>closePreview(false)}> Close Preview </Button>
            </Flex>
            
            <Content BannerImg={BannerImg} blogHeader={blogHeader} blogContent={blogContent}></Content>
          
    </Box>
)

}