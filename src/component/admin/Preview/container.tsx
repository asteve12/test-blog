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
        minH:"100%",
        bg:"#FBFBFD"
        
    },
    adminStyle: {
        position:"fixed",
        zIndex: "10",
        w: ["100%","100%","100%","85%"],
        top: "0px",
        pt: "10px",
        overflowY: "scroll",
        h: "100vh",
        left: "auto",
        right: "1%",
        ml: "0px",
        pb: "10%",
        
        
    }
}


//props


type PreviewContainer = {
    closePreview: React.Dispatch<React.SetStateAction<boolean>>,
    BannerImg: string,
    blogHeader: string,
    blogContent: string,
    summary: string,
    category: string,
    type?:string

    
}







export const PreviewContainer = ({ closePreview,
    BannerImg, blogHeader,
    blogContent, category, summary, type }: PreviewContainer) => {
    let containerStyle = {
        ...styles.containerStyle,
       


    }
    //@ts-ignore
    if(type === "admin")  containerStyle = {...styles.containerStyle,...styles.adminStyle}

  
    
  

    return (
        <Box  {...containerStyle}>
        
            { <Flex justifyContent="right" >
            <Button  {...styles.closePreviewStyle  as ChakraProps}  onClick={()=>closePreview(false)}> Close Preview </Button>
            </Flex>}
            
            <Content
                category={category}
                summary={summary}
                BannerImg={BannerImg} blogHeader={blogHeader}
                blogContent={blogContent}></Content>
          
    </Box>
)

}