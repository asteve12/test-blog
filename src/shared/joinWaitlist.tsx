import { 
  Image,
  Flex, 
  FormControl, 
  Input,
  Text,
  Button, 
  FlexProps,
   InputProps,
  Box } from "@chakra-ui/react"
import { BeatLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
import React, { ReactNode } from "react";
import { Nav } from 'react-bootstrap';
import Link from 'next/link'




type JoinWaitlist = {
    handleSubscribeBxChange: (e: React.ChangeEvent) => void,
    formValue: string | undefined,
    isSubmitting:"SUBMITTING" | "SUCCESS" | "FAILURE" | undefined
    errorMessage: string | undefined,
    handleSubsribeRequest: (e: React.MouseEvent) => void,
    styles?:FlexProps,
    inputBxStyle?: InputProps,
    SubmitBtnStyle?: React.CSSProperties,
    customSubmitComponent?: ReactNode,
    placeholderStyle?: Object,
  isFormFilled?: boolean,
    
}


export const JoinWaitlist = (props: JoinWaitlist) => {


  const isEmailValid =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.formValue as string);
  
    const { t } = useTranslation('common');
    const Loader = <BeatLoader color="white" />

    
    const SubmitBtn = <Button 
    w={["96%","96%","60%","187px"]}
    ml={["auto","auto",null]}
    mr={["auto","auto",null]} 
    mt={["30px","30px","30px","0px"]}
    
    
    bottom="0px"
      isDisabled={!isEmailValid} 
    onClick={props.handleSubsribeRequest} 
    fontFamily="satoshi" h="67px" fontSize="17px"
  rounded="100px" bg="#EA445A !important" >
  {props.isSubmitting === "SUBMITTING" ? Loader:t('blog.loop_form_button_getStarted')}
</Button>




    return   <FormControl >
    <Flex
            w={['100%', '100%', '100%', '100%', '692px']}
            justifyContent="center"
            flexDirection={["column","column","column","row"]}
            mt="25px"
            ml="auto"
            mr="auto"
            color="white"
        {...props.styles}
        position="relative"
      
      >
      


        
        <Flex  w={['100%', '100%', '100%', '100%', '692px']}
          mt="5px"
          position="absolute"
          ml="10%"
          top="90px"
      
        > 

<Box >
            {props.formValue  && !isEmailValid && <Text ml="0px" mt="-20px" color="red" fontSize="13px">
                email is not valid
           </Text> }

            </Box>
         
      </Flex>
      <Input
      display={["block"]}
        w={['95%',"95%","60%"]}
        ml={["auto","auto",null]}
        mr={["auto","auto",null]}
        
        h="67px"
        rounded="5px"
        placeholder={`${t('blog.loop_input_placeholder')}`}
                type="email"
                required
        fontSize="16px"
                color="white"
                {...props.inputBxStyle}
        onChange={props.handleSubscribeBxChange}
                value={props.formValue} 
                cursor="text"
        _placeholder={{ color: 'white', ...props.placeholderStyle }}
          p="16px"
          
        data-formName="subscribe"

            />
           
          
            
      {/* render subit button */}
      {props.customSubmitComponent ?  props.customSubmitComponent:SubmitBtn}
      {  props.errorMessage && <Text ml="10px" w="auto" fontSize="15px" color="white !important" >
      {props.errorMessage}</Text>}

      </Flex>
    
      
 

  </FormControl>
} 