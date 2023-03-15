import { Text,Box } from '@chakra-ui/react';

export const BlogTitle = (props) => {
  return (
    <Box
      mb="8px"
      mt="4px"
      p="8px"
      pt="2px"
      pb="2px"
       borderRadius="16px"
      background="#F0F4FF"
      maxW="200px"
      fontFamily="satoshi"
      fontWeight="normal"
     
      color="#5D82F1"
      textAlign="center"
      cursor="pointer"
      isTruncated
      fontSize="12px"
  
      boxSizing='border-box'
    >
      {props.title}
    
    </Box>
  );
};
