
import { Main } from "@/component/admin/addArticle/main"
import { WithAuthenticate } from "@/HOC/authenticate"
import { Layout } from "@/layout"
import { Box } from "@chakra-ui/react"
import {useRouter} from "next/router"






const AddArticle = (props: any) => {
    const Router = useRouter()
    const queryObject = Router.query
    console.log("Router",Router)
   
       const loginUser  = props?.user?.singleUserData
     let profilePics = loginUser?.authorImage?.url as string
     profilePics = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${profilePics}`
     const name = loginUser?.username as string

     console.log("Add-article-props", loginUser)



    return (
        <Layout  draft={[]} showSideBar={true} showHeader={false} showLoginHeader={true}  >
            <Box w="100%" bg="#fbfbfd">
                <Main  profilePics={profilePics} username={name}/> 
            </Box>
           
        </Layout>
    )
 }


 export  default  WithAuthenticate(AddArticle)