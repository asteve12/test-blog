import { Flex, Image, Text } from '@chakra-ui/react';

export const BlogAuthCard = ({ authorImage, authorName }) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

  console.log('authorImage', `${authorImage}`);

  return (
    <Flex alignItems="center">
      <Image
        width="24px"
        height="24px"
        rounded="24px"
        mr="10px"
        src={authorImage}
      ></Image>
      <Text fontWeight="200" fontSize="14px" color="#666481">
        {authorName}
      </Text>
    </Flex>
  );
};
