import { Box, Flex, Heading, HStack, Text} from '@chakra-ui/react';
import React, { useLayoutEffect, useRef,useState } from 'react';
import { BlogTitle } from '../../shared/blogTitlteCard';
import { TimerCard } from '../../shared/TimeCard';
import { Socials } from './socials';


type IBlogDetailContent = {
  title: string;
  content: string;
  timeToRead: number | void;
  category: string,
  summary:string
};

const styles = {
  socialContainerStyle: {
    
  }
}

export const BlogDetailContent = ({ title, content, timeToRead,category,summary}: IBlogDetailContent) => {
  const currentRef = useRef<HTMLDivElement>(null)
  const [height,setHeight] = useState<string>()


  useLayoutEffect(() => {
    if (currentRef.current) {
      const contentContStyle = window.getComputedStyle(currentRef.current)
      //const contentContHeight = 
      setHeight(contentContStyle.getPropertyValue("height"))
    //console.log("height12",)
      
    } 
  })
  

 

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
     <Socials containerHeight={height}></Socials>
     

      <Box 
        mb={["50px", "30px", "0px", "0px"]}
        ml={["0px", "0px", "0px", "20px"]}
        pl={['0px', '0px', '0px', '0px']}
        w={['100%', '100%', '80%']}
        ref={currentRef}
        
      >
        <HStack  gap={10} display={["none",'flex']} flexDirection={['row', 'row', 'row']} justifyContent={["space-between","start",null,null]}>
          <BlogTitle title={category}></BlogTitle>
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
            fontSize={["4rem",'5rem', '6rem']}
          >
            {title}
          </Heading>
          <Text
            mb="35px"
            color="#666481"
            fontSize={"2rem"}
          >{summary}</Text>
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
