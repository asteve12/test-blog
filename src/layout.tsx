import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react'
import Community from './component/community';
import Footer from './component/footer';
import { NavHeader } from './shared/nav';
import { Loop } from './component/blog/loop';
import { SideBar } from './shared/admin/sidebar';
import { signOut,useSession } from 'next-auth/react';
import { useConditionallyRenderElement } from './hooks/useConditionallyRenderedElement';
import { Button } from '@chakra-ui/react'
import { MODE } from './shared/enum';
import { userLayoutLogic } from './hooks/useLayoutLogic';




type LayoutType = {
  children: React.ReactNode,
  showHeader?: boolean,
  showSideBar?: boolean,
  showLoginHeader?: boolean,
  draft?: any,
  featuredArticleId?:any
}



export const Layout = ({ showLoginHeader,children, showHeader, showSideBar,draft }: LayoutType) => {
  const { data: session, status } = useSession()
  const [mode, setMode] = useState(MODE.Attendees);
  const { handleSubscribeBxChange,
    handleSubsribeRequest,
    subscribeValue,
    isSubmitting,
    errorMsg,
    closeSubscribeModal,
    showSubscribeModal,
    isFormFilled
    
  } = userLayoutLogic()
  
  const isUserAuthenticated = status === "authenticated"
  const LogoutComponent =  <Flex p="10px" justifyContent="right"><Button onClick={()=> signOut()}>Logout</Button></Flex>
  const ElementToRenderWithCondition =  useConditionallyRenderElement(LogoutComponent,isUserAuthenticated) as React.ReactNode
  
  
  const componentWhenshowSideBar_True = <Flex w="100%" justifyContent="space-between"><Box w="220px" display={["none", "none", "none", "block"]}><SideBar draft={draft}></SideBar></Box><Box w={["100%", "100%", "100%", "86%"]} >
    <Box>
    {showLoginHeader && ElementToRenderWithCondition}
    {children}
    </Box>
    
  </Box>
  </Flex>

  const componentWhenshowSideBar_False = <>{children}<Box mb={["150px", null, null, null]}><Community></Community></Box><Box display={['none', 'none', 'block']}><Loop
  showSubscribeModal={showSubscribeModal}
    onChange={handleSubscribeBxChange}
    formValue={subscribeValue}
    handleSubsribeRequest={handleSubsribeRequest}
    isSubmitting={isSubmitting}
    errorMessage={errorMsg}
    closeSubscribeModal={closeSubscribeModal}
    handleSubscribeBxChange={handleSubscribeBxChange}
    isFormFilled={isFormFilled}
  ></Loop></Box><Footer />
  </>
  
  return (
    <Box w="100%" >
       {mode === MODE.Attendees && showHeader ? (
        <NavHeader
          showSubscribeModal={showSubscribeModal}
          formValue={subscribeValue}
          handleSubscribeBxChange={handleSubscribeBxChange}
          isSubmitting={isSubmitting}
          errorMessage={errorMsg}
          handleSubsribeRequest={handleSubsribeRequest}
          closeSubscribeModal={closeSubscribeModal}
          mode={mode}
          setMode={setMode} />
      ) :null}
    
      <Box w="100%"   >
     
      {showSideBar ? componentWhenshowSideBar_True :componentWhenshowSideBar_False }
      </Box>
      
    
    
    </Box>
  );
};
