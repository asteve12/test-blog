import { Flex, FlexProps } from "@chakra-ui/react"


type Featured = {
    style?:React.CSSProperties
}



export const Featured = (props: Featured) => <Flex  
    alignItems="center" fontSize="12px" color="#5D82F1"
    justifyContent="center"
    borderRadius="10px" left="30px"
    paddingLeft="10px"
    paddingRight="10px"
    top="10px" bg="#F0F4FF"
    position="absolute"
    {...props.style as FlexProps}
>
Featured
</Flex>