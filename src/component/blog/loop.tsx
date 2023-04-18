
import { useConditionallyRenderElement } from '@/hooks/useConditionallyRenderedElement';
import { JoinWaitlist } from '@/shared/joinWaitlist';
import { Box, Button, Flex, FormControl, Img, Input, Text, Heading } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { WaitlistModal } from '../waitlistModal';





type ILoop = {
  onChange: (e: React.ChangeEvent) => void,
  formValue: string | undefined,
  handleSubsribeRequest: (e: React.MouseEvent) => void,
  isSubmitting:"SUBMITTING" | "SUCCESS" | "FAILURE" | undefined
  errorMessage: string | undefined,
  showSubscribeModal: true | false,
  closeSubscribeModal: () => void,
  handleSubscribeBxChange: (e: React.ChangeEvent) => void,
  isFormFilled:boolean | undefined
}

export const Loop = (props:ILoop) => {
  const { t } = useTranslation('common');

  




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
            
            <JoinWaitlist
              handleSubscribeBxChange={props.handleSubscribeBxChange}
              formValue={props.formValue}
              isSubmitting={props.isSubmitting}
              errorMessage={props.errorMessage}
              handleSubsribeRequest={props.handleSubsribeRequest}
            ></JoinWaitlist>
</Box>
      
      </Flex>
      
      </Box>
      </>
  );
};
