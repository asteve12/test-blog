import { Box, Flex, Heading, HStack} from '@chakra-ui/react';
import { BlogTitle } from '../../shared/blogTitlteCard';
import { TimerCard } from '../../shared/TimeCard';
import { Socials } from './socials';

type IBlogDetailContent = {
  title: string;
  content: string;
  timeToRead: number | void;
};

const styles = {
  socialContainerStyle: {
    
  }
}

export const BlogDetailContent = ({ title, content, timeToRead }: IBlogDetailContent) => {
  return (
    <Flex
      w="100%"
      flexDirection={['column-reverse', 'column-reverse', 'row']}
      alignItems={['start','start', 'start']}
      justifyContent={['start', null]}
      pl={["0px","0px","2%"]}
      pt="30px"
      position="relative"
      h="auto"
      
      
    >
 <Socials></Socials>
     
      <Box   mb={["50px","30px","0px","0px"]} ml={["0px", "0px", "0px", "20px"]}
        
        pl={['0px', '0px', '0px', '0px']}
        w={['100%', '100%', '80%']}>
        <HStack  gap={10} display={["none",'flex']} flexDirection={['row', 'row', 'row']} justifyContent={["space-between","start",null,null]}>
          <BlogTitle title={title}></BlogTitle>
          <TimerCard timetoRead={timeToRead}></TimerCard>
        </HStack>
        <Box width="100%" mt="18px">
          <Heading
            color="#2D2B4A"
            textAlign={'left'}
            mt="0px"
            mb="10px"
            fontFamily="satoshi black"
            fontWeight="900"
            fontSize={['2.4rem',"3.4rem",'4rem', '4.4rem']}
          >
            {title}
          </Heading>
          <Box
            
            maxW={["100%","100%","90%"]}
            fontWeight="400"
            fontFamily="satoshi"
            className="blogContainer"
            color="#666481"
            fontSize="18px"
            //textAlign={[ 'left']}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Box>
      </Box>
    </Flex>
  );
};
