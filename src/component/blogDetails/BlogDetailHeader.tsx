import { Box, HStack, Image, Text } from '@chakra-ui/react';
import {IoIosArrowForward} from "react-icons/io"
import { useTranslation } from 'next-i18next';

type IBlogDetailHeader = {
  imagePath: string;
  baseUrl: string;
};

export const BlogDetailHeader = ({ imagePath, baseUrl }: IBlogDetailHeader) => {
  const { t } = useTranslation('common');

  return (
    <Box w="100%">
      <HStack fontWeight="bold">
        <Text color="#C2C1CF" fontSize="14px" >
         
          {t('blogDetails.blog_head_1')}
          
        </Text>
        <IoIosArrowForward size="15" color="#C2C1CF"></IoIosArrowForward>
        <Text fontSize="14px">{t('blogDetails.blog_head_2')}</Text>
      </HStack>
      <Image
        objectFit="cover"
        mt="20px"
        width="100%"
        h="420px"
        borderRadius="16px"
        src={`${baseUrl}${imagePath}`}
      ></Image>
    </Box>
  );
};
