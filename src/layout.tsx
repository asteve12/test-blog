import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import Community from './component/community';
import Footer from './component/footer';
import { NavHeader } from './shared/nav';
import { Loop } from './component/blog/loop';
import { SideBar } from './shared/admin/sidebar';



type LayoutType = {
  children: React.ReactNode,
  showHeader?: boolean,
  showSideBar?:boolean
}



export const Layout = ({ children, showHeader, showSideBar }: LayoutType) => {
  
  const componentWhenshowSideBar_True = <Flex w="100%" justifyContent="space-between"><Box w="220px"><SideBar></SideBar></Box><Box w="90%" >{children}</Box></Flex>
  const componentWhenshowSideBar_False =  <><Community></Community><Box display={['none','none', 'block']}><Loop></Loop></Box><Footer />
  </>
  
  return (
    <main >
      {showHeader && <NavHeader></NavHeader>}
      <Box w="100%"  bg="#fbfbfd">
      {children}
      {showSideBar ? componentWhenshowSideBar_True :componentWhenshowSideBar_False }
      </Box>
      
    
    
    </main>
  );
};
