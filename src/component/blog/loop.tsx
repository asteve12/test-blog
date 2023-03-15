
import { useConditionallyRenderElement } from '@/hooks/useConditionallyRenderedElement';
import { Box, Button, Flex, FormControl, Img, Input, Text, Heading } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { BeatLoader } from 'react-spinners';
import { WaitlistModal } from '../waitlistModal';




type ILoop = {
  onChange: (e: React.ChangeEvent) => void,
  formValue: string | undefined,
  handleSubsribeRequest: (e: React.MouseEvent) => void,
  isSubmitting:"SUBMITTING" | "SUCCESS" | "FAILURE" | undefined
  errorMessage: string | undefined,
  showSubscribeModal: true | false,
  closeSubscribeModal: () => void,
  handleSubscribeBxChange:(e:React.ChangeEvent) => void
}

export const Loop = (props:ILoop) => {
  const { t } = useTranslation('common');

  const Loader = <BeatLoader color="white" />

const submitBtn =  <Button w={['187px']}  onClick={props.handleSubsribeRequest} fontFamily="satoshi" h="67px" fontSize="17px"
  rounded="100px" bg="#EA445A !important" ml="10px">
  {props.isSubmitting === "SUBMITTING" ? Loader:t('blog.loop_form_button_getStarted')}
</Button>


  return (
    <>
      {props.showSubscribeModal === true && <WaitlistModal 
        closeSubscribeModal={props.closeSubscribeModal} ></WaitlistModal>}
    <Box width="100%"  zIndex="1"  h={["auto", "auto", "600px", "900px"]} position="relative" >
   
      <Box  position="absolute" h="100%"   w="100%" >
      <Img
        w="100%"
       objectFit="cover"
        h="100%"
       
        top="0px"
        src="/blog/loopBg.png"
      />

      </Box>
      
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
          <Heading id="join-the-hype" fontFamily="satoshi black" textAlign="center"
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

          <FormControl >
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
                onChange={props.handleSubscribeBxChange}
                value={props.formValue}
                _placeholder={{ color: 'white' }}
                  p="16px"
                  
                data-formName="subscribe"

              />
              {/* render subit button */}
              {submitBtn}
              {  props.errorMessage && <Text ml="10px" w="auto" fontSize="15px" color="white !important" >
              {props.errorMessage}</Text>}

            </Flex>
           

          </FormControl>
         
        </Box>
      
      </Flex>
      
      </Box>
      </>
  );
};
