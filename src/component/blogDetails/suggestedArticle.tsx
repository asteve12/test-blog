import { ArticleCard } from "@/shared/ArticleCard"
import { Box, Flex, Heading } from "@chakra-ui/react"
import Link from "next/link"
import { useTranslation } from "next-i18next"




type ISuggestedArticle = {
    otherArticles: React.ReactNode
}






export const SuggestedArticle = ({otherArticles}:ISuggestedArticle) => {
    const {t} = useTranslation("common")


    return <Box>
        <Heading mt="70px" fontWeight="900" fontFamily="satoshi bold"  color="#2D2B4A" fontSize="44px" textAlign="center">
            { t("blogDetails.suggested_article_header")}
        </Heading>
        <Flex mt="30px" mb="30px"   w="100%"  flexWrap="wrap"  justifyContent="space-between">
            {otherArticles}
                
        </Flex>
      
    </Box>
}


