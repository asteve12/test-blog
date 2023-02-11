import Head from 'next/head'
import { Inter } from '@next/font/google'
import { SideBar } from '../../shared/admin/sidebar'
import { Box, Flex,FlexProps } from '@chakra-ui/react'
import { Layout } from '../../layout'
import { HomeMain } from '../../component/admin/Home/Main'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const containerStyle ={paddingLeft:"30px", paddingRight:"30px"}
  return (
    <Layout showSideBar={false} showHeader={false}>
    <HomeMain></HomeMain>
  </Layout>
  )
}
