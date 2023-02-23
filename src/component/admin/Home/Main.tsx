import { OtherArticle } from '@/component/blog/otherArticle'
import { useHomeLogic } from '@/hooks/homeLogic'
import { useAdminLogic } from '@/hooks/useAdminLogic'
import { useRenderArticles,useRenderAdminArticle } from '@/hooks/useRenderArticles'
import { Flex, Stack } from '@chakra-ui/react'
import { BlogCard } from './blogcard'
import { Header } from './Header'




type IHomeMain = {
    allArticles:any[]
}

export const HomeMain = (props: IHomeMain) => {
    const { deleteArticle, isDeleting, searchForBlog, searchBlogRes, inputFieldValue } = useAdminLogic()
    console.log("test234",searchBlogRes.length > 0 && inputFieldValue )
    let allArticle  = useRenderAdminArticle(searchBlogRes.length >= 0 && inputFieldValue ? searchBlogRes:props.allArticles,deleteArticle,isDeleting)

    // if (searchBlogRes.length > 0 && inputFieldValue) {
    //     console.log("searchBlogRes123",searchBlogRes)
        
    // }
    // else {
    //     allArticle = useRenderAdminArticle(props.allArticles,deleteArticle,isDeleting)
        
    // }
     
    
   

    return (
        <Stack w="100%" pl="2%"  minH="100vh" pr="2%" >
            <Header searchForBlog={searchForBlog}></Header>
            {
                allArticle?.length > 0  ? <Flex  flexWrap="wrap" width="100%" justifyContent="space-between" >
                {
                    allArticle
               }
                </Flex> :
                    <Flex justifyContent="center" alignItems="center">
                       {inputFieldValue ?  "No blog found":"No Blog Added yet"}

                    </Flex>
           }
            
            
            
            {/* < BlogCard></BlogCard> */}
</Stack>

    )
}