import { Box, Image,Flex,Button, ChakraProps} from "@chakra-ui/react";
import { animated, AnimatedProps, useSpring } from "@react-spring/web";
import { FaFacebookF } from "react-icons/fa"
import {TfiTwitterAlt} from "react-icons/tfi"
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai"
import {IoCloseOutline} from "react-icons/io5"


//icons
//import  SuccessLogo from "../../public/images/Loop/successIcon.svg"



import React, { useEffect } from "react";
import Link from "next/link";
 
const styles = {
    modalContainerStyle: {
      
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(6, 6, 11, 0.7)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        
        

        
    },
    innerModCont: {
        position: "relative"
        
    }
} 


type Iwaitlist = {
    closeSubscribeModal: () => void,
   

}

export const WaitlistModal = (props:Iwaitlist) => {
    const [springs, springApi] = useSpring(() => ({
        opacity: 0,
        config: {
            mass: 0,
            //friction: 0,
            //tension: 120,
          },
        
    }))

    const socialMediaIcons = [
        <FaFacebookF color="#EA445A" size="20px" ></FaFacebookF>,
        <TfiTwitterAlt color="#EA445A" size="20px"></TfiTwitterAlt>,
        <AiFillInstagram color="#EA445A" size="20px"></AiFillInstagram>,
        <AiFillLinkedin color="#EA445A" size="20px"></AiFillLinkedin>
    ]
    

    useEffect(() => {

        springApi.start({
            opacity: 1, config: {
            //friction: 10,
                mass: 1,
                tension:200
        }})
        

    }, [])
    

    //@ts-ignore
    return <Box position="fixed" w="100%" top="0px" zIndex="100"   >

        <Box {...styles.innerModCont  as ChakraProps}>

        <animated.div style={{ ...styles.modalContainerStyle, ...springs }}>
        <Button  outline="none" onClick={props.closeSubscribeModal} position="absolute"  colorScheme="none" top="7%" left="65%">
            <IoCloseOutline color="black" size="30px"></IoCloseOutline>
        </Button>
            <Box  w="510px" padding="4%"  maxW="90%"  h="560px"  bg="white"  borderRadius="16px">
                <Flex justifyContent="center" w="100%">
                    <Image  w="120px" maxW="50%"  maxH="50%" h="120px" src="/images/Loop/successIcon.svg"/>
                </Flex>

                <Flex justifyContent="center"  fontFamily="satoshi black" mt="30px" w="100%">
                    <Box display="block"  w="284px" textAlign="center"  fontWeight="bold"  color="black" fontSize={["1.2rem","1.8","2.2rem","2.4rem"]}  >
                    Welcome to the Gruve Family
                    </Box>

                    
                </Flex>

                <Flex  justifyContent="center" >
                    <Box w="346px" textAlign="center" maxW="90%" color="#717171" fontSize="1.4rem">
                    You have successfully joined the waitlist for Gruve, this means that you would be notified of any progress of our product launch. Feel free to share Gruve with your friends
                    </Box>
                </Flex>

                <Flex justifyContent="center" mt="50px">
                    
                    {
                        socialMediaIcons.map((socialIcons) => <Link  href="/">
                        <Button colorScheme="none"  bg="#FFF6F8"  w="50px" h="50px" borderRadius="50px">
                   {socialIcons}
            </Button>
                        </Link>)
                    }

                    
                </Flex>
       </Box>
    </animated.div>
        </Box>
       
        
    </Box> 
}