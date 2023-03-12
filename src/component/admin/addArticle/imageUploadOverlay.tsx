import { Box, Text, TextProps } from "@chakra-ui/react"
import React, { ChangeEvent } from "react"
import { BiImageAdd } from "react-icons/bi"
import { animated } from '@react-spring/web'
import { useConditionallyRenderElement } from "@/hooks/useConditionallyRenderedElement"
import { ThreeDots } from "react-loader-spinner"




const styles = {
    overlayContStyle: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
        
    },
    AddImageTextStyle: {
        textAlign: "center",
        color: "white",
        fontSize:"20px"
    }
}


type ImageUploadOverlay = {
    spring: any,
    changeImageHandlerBtn: (e:React.MouseEvent) => void,
    uploadStatus:boolean
}

export const ImageUploadOverlay = (props: ImageUploadOverlay) => {
    const uploadImageBtn =  <Box onClick={props?.changeImageHandlerBtn}>
    <BiImageAdd color="white" size="100" />
    <Text  {...styles.AddImageTextStyle  as TextProps}>
        Add Image
    </Text>
</Box>

const loader = <ThreeDots color="white"></ThreeDots> 
   const  renderImageUploadBtnWithCondition  = useConditionallyRenderElement(uploadImageBtn,!props?.uploadStatus,loader,props?.uploadStatus) as React.ReactNode

    return <animated.div
        
        style={{ ...styles.overlayContStyle, ...props.spring }}
    >

       {renderImageUploadBtnWithCondition }
    
        
        
    </animated.div>

}