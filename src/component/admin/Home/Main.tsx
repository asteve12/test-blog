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
    const {deleteArticle} =useAdminLogic()

    const allArticle = useRenderAdminArticle(props.allArticles,deleteArticle)
   

    return (
        <Stack w="100%" pl="2%" pr="2%" >
            <Header></Header>
            <Flex  flexWrap="wrap" width="100%" justifyContent="space-between" >
            {
                allArticle
           }
            </Flex>
            
            
            {/* < BlogCard></BlogCard> */}
</Stack>

    )
}