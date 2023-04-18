import { Box, HStack, Image, Text } from '@chakra-ui/react';
import {IoIosArrowForward} from "react-icons/io"
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
Link
type IBlogDetailHeader = {
  imagePath: string;
  baseUrl: string;
};

export const BlogDetailHeader = ({ imagePath, baseUrl }: IBlogDetailHeader) => {
  console.log("cloudinaryImage12",imagePath)
  const { t } = useTranslation('common');

  return (
    <Box w="100%">
      <HStack fontWeight="bold" mb="10px">
        <Link href="/">
        <Text color="#C2C1CF" fontSize="14px" >
         
         {t('blogDetails.blog_head_1')}
         
       </Text>
        </Link>
        
        <IoIosArrowForward size="15" color="#C2C1CF"></IoIosArrowForward>
        <Text cursor="pointer" fontSize="14px">{t('blogDetails.blog_head_2')}</Text>
      </HStack>

      <Box
                w="100%"
                paddingTop="40%"
                position="relative"
            
                boxSizing="border-box"
                
                
            >

<Image
       position="absolute"
       top="0" 
       bottom= "0"
       left= "0"
       right ="0"
       w="100%"
       h="100%"
       objectFit="cover"
       borderRadius="10px"
        src={`${imagePath}`}
          
          
      ></Image>

        
               
            </Box>
    
    </Box>
  );
};
