import { Box, Flex, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { BlogTitle } from '../../shared/blogTitlteCard';
import { TimerCard } from '../../shared/TimeCard';
import { Socials } from './socials';

type IBlogDetailContent = {
  title: string;
  content: string;
  timeToRead: number | void;
};

export const BlogDetailContent = ({ title, content, timeToRead }: IBlogDetailContent) => {
  return (
    <Flex
      w="100%"
      flexDirection={['column-reverse', 'column-reverse', 'row']}
      alignItems={['center', 'center', 'start']}
      justifyContent={['center', null]}
    >
      <Socials></Socials>
      <Box pt={'25px'} pl={['0px', '0px', '35px']} w={['100%', '80%']}>
        <HStack gap="10px" display={['flex']} flexDirection={['column', 'column', 'row']}>
          <BlogTitle title={title}></BlogTitle>
          <TimerCard timetoRead={timeToRead}></TimerCard>
        </HStack>
        <Box width="100%">
          <Heading
            color="#2D2B4A"
            textAlign={['center', 'center', 'left']}
            mt="10px"
            mb="10px"
            fontFamily="satoshi bold"
            fontWeight="900"
            fontSize={['24px', '44px']}
          >
            {title}
          </Heading>
          <Box
            fontWeight="400"
            fontFamily="satoshi"
            className="blog"
            color="#666481"
            fontSize="18px"
            textAlign={['center', 'center', 'left']}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Box>
      </Box>
    </Flex>
  );
};
