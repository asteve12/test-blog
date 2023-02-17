import { CustomIcons } from "@/utils/customIcons"
import { Box, Input, Stack, Text, Button, InputGroup, InputLeftElement } from "@chakra-ui/react"
import Link from "next/link"
//icons
import {CiSearch} from "react-icons/ci"




export const Header = () => {
  return <Box pb="24px" w="100%"  minH="56px" pt="24px" display="flex" justifyContent="space-between" alignItems="center" >
  
     <Text fontSize="32px" fontWeight="700" >
        Blog Articles
    </Text>

    <Box h="100%" w="700px" display="flex"  >
    <Stack spacing="24px">
            <InputGroup    w="490px" h="56px" mr="15px">
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
          <Input fontSize="16px" pl="30px" display="flex" alignItems="center" borderRadius="50px" w="100%" h="100%" type='tel' placeholder='Search Blog' />
        </InputGroup>
      </Stack>
      <Link href="/admin/add-article">
      <Button fontSize="14px" colorScheme="none" w="173px" h="56px" bg="#EA445A"  color="white" borderRadius="200px" >Add New Article</Button>

      </Link>
      </Box>
    </Box>
    
}