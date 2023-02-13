import { Box, Button, Flex, FormControl, Img, Input, Text, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const Loop = () => {
  const { t } = useTranslation('common');

  return (
    <Box width="100%" h="900px" position="relative">
      <Img
        w="100%"
        objectFit="cover"
        h="100%"
        position="absolute"
        top="0px"
        src="/blog/loopBg.png"
      />
      <Flex
        justifyContent="center"
        w="100%"
        h="100%"
        bg="#06060B"
        opacity="0.8"
        position="absolute"
        top="0px"
      >
        <Img
          w="80%"
          h="100%"
          src="/blog/loopAnimeLogo.png"
          bg="transparent"
          position="absolute"
          top="0px"
        />
      </Flex>
      <Flex
        h="100%"
        w="100%"
        color="white"
        position="absolute"
        alignItems="center"
        justifyContent="center"
      >
        <Box ml="auto" mr="auto" w="100%">
          <Heading fontFamily="satoshi black" textAlign="center"
            fontWeight="900" fontSize={["5rem","5rem","5rem","10rem"]} mb="5px">
            {t('blog.loop_header')}
          </Heading>
          <Text
            w="566px"
            maxW="100%"
            ml="auto" mr="auto" mb="15px"
            fontFamily="satoshi"
            textAlign="center" fontWeight="400" fontSize="18px">
            {t('blog.loop_text')}
          </Text>

          <FormControl>
            <Flex
              w={['100%', '100%', '100%', '100%', '692px']}
              justifyContent="center"
              mt="25px"
              ml="auto"
              mr="auto"
              color="white"
              
            >
              <Input
                w="60%"
                h="67px"
                rounded="5px"
                placeholder={`${t('blog.loop_input_placeholder')}`}
                type="email"
                fontSize="16px"
                color="white"
                _placeholder={{ color: 'white' }}
                p="16px"

              />
              <Button w={['187px']}  fontFamily="satoshi" h="67px" fontSize="17px"
                rounded="100px" bg="#EA445A !important" ml="10px">
                {t('blog.loop_form_button_getStarted')}
              </Button>
            </Flex>
          </FormControl>
        </Box>
      </Flex>
    </Box>
  );
};
