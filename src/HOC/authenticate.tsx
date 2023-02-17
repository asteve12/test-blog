import React from "react"
import { Box, Flex, FlexProps } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router"
import { Audio } from "react-loader-spinner"
import { JsxElement } from "typescript"



export const WithAuthenticate = (WrappedComponent:React.FC<any>) => {
    
    return (Props:any) => {

      const LoadingComponent =  <Flex  w="100%" h="100%"  alignItems="center"  justifyContent="center">
      <Audio
    height="100"
    width="100"
    color="#4fa94d"
    ariaLabel="audio-loading"
    wrapperStyle={{}}
    wrapperClass="wrapper-class"
    visible={true}
  />
    </Flex>

        const Router = useRouter()
      const { data, status } = useSession()
      console.log("data",data,status)
        if (status === "loading") return  LoadingComponent
      if(status !== "authenticated"  )  Router.push("/api/auth/signin")
    
        
        return <WrappedComponent {...Props} {...data} ></WrappedComponent>
        
    }
    
   

}