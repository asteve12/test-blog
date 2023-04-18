import { CustomIcons } from "@/utils/customIcons"
import { Box, Input, Stack, Text, Button, InputGroup, InputLeftElement } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
//icons
import {CiSearch} from "react-icons/ci"


type IHeader = {
  searchForBlog:(e:React.ChangeEvent)=> void
}



export const Header = ({searchForBlog}:IHeader) => {
  return <Box
    flexDirection={["column", "column", "column", "row"]}
    pb="24px"
    w="100%"
    minH="56px"
    pt="24px"
    display="flex"
    justifyContent="space-between"
    alignItems="center" >
  
    <Text fontSize={["15px", "15px", "15px", "32px"]}
      display={["none", "none", "none", "flex"]} fontWeight="700" >
        Blog Articles
    </Text>

    <Box h="100%" w={["100%","100%","100%","700px"]} display="flex"  >
    <Stack spacing="0px" w="100%">
            <InputGroup    w={["90%","90%","80%","490px"]} h="56px" mr="15px">
          <InputLeftElement
            pointerEvents='none'
            h="100%"
            w="50px"
            children={<CustomIcons style={{
              color: "#666481",
              fontSize: "25px",
              marginRight:"16px"
            }} Icon={CiSearch} />}
          />
          <Input onChange={searchForBlog} fontSize="16px" pl="30px"  display="flex" alignItems="center" borderRadius="50px" w="100%" h="100%" type='text' placeholder='Search Blog' />
        </InputGroup>
      </Stack>
      <Link href="/admin/add-article">
      <Button fontSize="14px" colorScheme="none" w="173px" h="56px" bg="#EA445A"  color="white" borderRadius="200px" >Add New Article</Button>

      </Link>
      </Box>
    </Box>
    
}