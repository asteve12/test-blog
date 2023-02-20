import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import Community from './component/community';
import Footer from './component/footer';
import { NavHeader } from './shared/nav';
import { Loop } from './component/blog/loop';
import { SideBar } from './shared/admin/sidebar';
import { signOut,useSession } from 'next-auth/react';
import { useConditionallyRenderElement } from './hooks/useConditionallyRenderedElement';
import { Button } from '@chakra-ui/react'




type LayoutType = {
  children: React.ReactNode,
  showHeader?: boolean,
  showSideBar?: boolean,
  showLoginHeader?:boolean
}



export const Layout = ({ showLoginHeader,children, showHeader, showSideBar }: LayoutType) => {
  const { data: session, status } = useSession()
  const isUserAuthenticated = status === "authenticated"
  const LogoutComponent =  <Flex p="10px" justifyContent="right"><Button onClick={()=> signOut()}>Logout</Button></Flex>
  const ElementToRenderWithCondition =  useConditionallyRenderElement(LogoutComponent,isUserAuthenticated) as React.ReactNode
  const componentWhenshowSideBar_True = <Flex w="100%" justifyContent="space-between"><Box w="220px"><SideBar></SideBar></Box><Box w="90%" >
    {showLoginHeader && ElementToRenderWithCondition}
    {children}
  </Box>
  </Flex>
  const componentWhenshowSideBar_False = <>{children}<Community></Community><Box display={['none','none', 'block']}><Loop></Loop></Box><Footer />
  </>
  
  return (
    <main >
       
     {showHeader && <NavHeader></NavHeader>}
      <Box w="100%"  bg="#fbfbfd">
     
      {showSideBar ? componentWhenshowSideBar_True :componentWhenshowSideBar_False }
      </Box>
      
    
    
    </main>
  );
};
