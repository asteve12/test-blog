import { Box, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import Community from './component/community';
import Footer from './component/footer';
import { NavHeader } from './shared/nav';
import { Loop } from './component/blog/loop';

// useMediaQuery

export const Layout = ({ children }) => {
  return (
    <main w="100%">
      <NavHeader></NavHeader>
      {children}
      <Community></Community>
      <Box display={['none', 'block']}>
        <Loop></Loop>
      </Box>
      <Footer />
    </main>
  );
};
