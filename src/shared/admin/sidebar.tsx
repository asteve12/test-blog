import { Box, Image, Button, Flex,Text } from "@chakra-ui/react"
import Link from "next/link"

//icons
import {BiGridAlt} from "react-icons/bi"


type ISideBar = {
    draft:any
}


export const SideBar = ({ draft }: ISideBar) => {

    const arrayOfDraft = draft.map((eachDraft: any) => <Link href={`/admin/add-article?id=${eachDraft?.id}&slug=${eachDraft?.attributes?.slug}&draft=true`}  >
        <Box mt="10px" >
            <Text  noOfLines={1} fontSize="13px"  color="white">

            {eachDraft?.attributes?.title}
            </Text>
        
        
     </Box></Link> )

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

            <Box ml="40px" color="white" mt="40px" fontSize="14px">
                <Text>Drafts</Text>
                {arrayOfDraft}
            </Box>

            
           
        </Box>

      


    )
}

