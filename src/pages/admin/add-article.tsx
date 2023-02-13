
import { Main } from "@/component/admin/addArticle/main"
import { Layout } from "@/layout"
import { Box } from "@chakra-ui/react"





 const AddArticle = () => {
    



    return (
        <Layout  showSideBar={true} showHeader={false}  >
            <Box w="100%" bg="#fbfbfd">
                <Main></Main>
            </Box>
           
        </Layout>
    )
 }


 export  default  AddArticle