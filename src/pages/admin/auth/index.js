import { Input,Button,Box, Flex,Text} from "@chakra-ui/react";
import { useState } from "react";
import { getProviders, getSession, signIn } from "next-auth/react"
import { useAdminBlogFormLogic } from "../../../hooks/adminBlogFormLogic"




const Signin = ({ providers }) => {
   
    const { onSubmit,
        onChangeHandler,
        onBlur, formikObject } = useAdminBlogFormLogic()

    


    
    return (
        <form onSubmit={onSubmit} style={{ width: "100%", height: "100vh" }}>
             
                
            <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
               
                <Box>
                        <Text textAlign="center">Login to gruve</Text>
                            <Input display="block" w="300px" h="40px" mb="15px" data-formName="email" value={formikObject.values.email} name="email" onBlur={onBlur} onChange={onChangeHandler} placeholder='email' />
                            <Input w="300px"  display="block" h="40px" mb="15px" data-formName="password" value={formikObject.values.password} name="password" onBlur={onBlur} onChange={onChangeHandler} placeholder='password' />
                            <Button display="block" type="submit" ml="auto"  mr="auto"  colorScheme='red'>login</Button>
                    </Box>
            </Flex>
            
            
            


        </form>
       
    )
}
export default Signin
export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });
    const providers = await getProviders()
    if (session) {
        return {
            redirect: { destination: "/" },
        };
    }
    return {
        props: {
            providers,
        },
    }
}