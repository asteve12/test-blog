import { Box, Image, Button, Flex,Text } from "@chakra-ui/react"
import Link from "next/link"

//icons
import {BiGridAlt} from "react-icons/bi"





export const SideBar = () => {

    const Items = [
        
        {
            name: "Home",
            icons:<BiGridAlt color="#EA445A" size={30} style={{marginRight:"15px"}}></BiGridAlt>
        }
    ]
    return (
        <Box w="200px" h="100vh" bg="#06060B"   position="fixed">
            
            <Image
                
                src="/images/ticketLogo.svg"
                alt="gruve logo"
                pl="30px"
                pt="30px"
                pb="30px"
                w="92px"
               
                
            />
            {
                Items.map((eachButtonItems) => (<Link  href="/admin">
                <Button
                    bg="#FFF6F8"
                    borderRadius="0px"
                    w="100%"
                    h="56px"
                    pl="30px"
                    display="flex"
                    justifyContent="left"
                    colorScheme="none"
                   
                >
                    {eachButtonItems.icons}
                    <Text color="#EA445A" fontSize="16px">{eachButtonItems.name}</Text>
                    
                    
                  </Button>
                </Link>))
            }
           
        </Box>

      


    )
}

