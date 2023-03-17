import React, { useEffect } from "react";
import { Box, Image, Flex, Button, ChakraProps } from "@chakra-ui/react";
import { animated, AnimatedProps, useSpring } from "@react-spring/web";
import { FaFacebookF } from "react-icons/fa"
import {TfiTwitterAlt} from "react-icons/tfi"
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai"
import { IoCloseOutline } from "react-icons/io5"
import {BsDiscord} from "react-icons/bs"
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
            <Link  target="_blank" rel="noopener noreferrer" href="https://twitter.com/gruvetickets"><TfiTwitterAlt color="#EA445A" size="20px"></TfiTwitterAlt></Link>,
        <Link target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/PYzVKPJ6"><BsDiscord color="#EA445A" size="20px"></BsDiscord></Link>,
        <Link  target="_blank" rel="noopener noreferrer"  href="https://www.linkedin.com/company/gruve-tickets/"><AiFillLinkedin color="#EA445A" size="20px"></AiFillLinkedin></Link>
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
        
                <Box w="510px" padding="4%" maxW="90%" h="auto" bg="white"
                    position="relative" borderRadius="16px">
            <Button  outline="none" onClick={props.closeSubscribeModal} position="absolute"  colorScheme="none" top="7%" right="1%">
            <IoCloseOutline color="black" size="30px"></IoCloseOutline>
        </Button>
                    
                    <Flex justifyContent="center" w="100%">
                    <Image  w="120px" maxW="50%"  maxH="50%" h="120px" src="/images/Loop/successIcon.svg"/>
                </Flex>

                <Flex justifyContent="center"  fontFamily="satoshi black" mt="30px" w="100%">
                    <Box display="block"  w="284px" textAlign="center"  fontWeight="bold"  color="black" fontSize={["1.8rem","1.8rem","2.2rem","2.4rem"]}  >
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
                        socialMediaIcons.map((socialIcons) =>    <Button colorScheme="none"  bg="#FFF6F8"  w="50px" h="50px" borderRadius="50px">
                        {socialIcons}
                 </Button>)
                    }

                    
                </Flex>
       </Box>
    </animated.div>
        </Box>
       
        
    </Box> 
}