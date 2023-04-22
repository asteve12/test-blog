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

    
    const SubmitBtn = <Button w={['187px']} 
    
    bottom="0px"
    //isDisabled={!isEmailValid} 
    onClick={props.handleSubsribeRequest} 
    fontFamily="satoshi" h="67px" fontSize="17px"
  rounded="100px" bg="#EA445A !important" ml="10px">
  {props.isSubmitting === "SUBMITTING" ? Loader:t('blog.loop_form_button_getStarted')}
</Button>




    return   <FormControl >
    <Flex
            w={['100%', '100%', '100%', '100%', '692px']}
            justifyContent="center"
            mt="25px"
            ml="auto"
            mr="auto"
            color="white"
        {...props.styles}
        position="relative"
      
      >
        <Flex w={['100%', '80%', '80%', '692px']}  display={["block","block","none","none"]}>

        <Nav  className="flex-column" style={{width:"100%"}}>
        <Box fontSize="16px" fontWeight="400" mb="15px" >
            <Nav.Link href={`${process.env.NEXT_PUBLIC_Landing_page_URL}?mode=attendee`} style={{width:"100%", color:"#666481"}}>
              <Text color="#66648 !important">
              For event attendees
              </Text>
              
              </Nav.Link>
        </Box>

        <Box ml="10px" w="100%" background="#666481" border="solid 0.5px #E1E1E8"/>

        <Box fontSize="16px" fontWeight="400" mb="15px" mt="15px">
        <Nav.Link href={`${process.env.NEXT_PUBLIC_Landing_page_URL}?mode=creator`} style={{width:"100%", color:"#666481"}}>For event creators</Nav.Link>
        </Box>


        <Box w={["100%","343px"]}  h="60px" >
        <Link href={`${process.env.NEXT_PUBLIC_BLOG_VISITOR_URL}`}>
        
        <Image objectFit="cover" src="/blog/bannerimg.svg"/>
        </Link>
       
          
        </Box>
          
 
    
  
     
    </Nav>

        </Flex>


        
        <Flex  w={['100%', '100%', '100%', '100%', '692px']}
          mt="5px"
          position="absolute"
          ml="10%"
          top="90px"
      
        > 


           {/* {props.formValue  && !isEmailValid && <Text ml="30px" mt="-20px" color="red" fontSize="13px">
                email is not valid
           </Text> } */}

      </Flex>
      <Input
      display={["none","none","block","block"]}
        w="60%"
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