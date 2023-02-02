import { Box, HStack, Image, Text } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"


type IBlogDetailHeader = {
    imagePath: string,
    baseUrl:string
}

export const BlogDetailHeader = ({imagePath, baseUrl}: IBlogDetailHeader) => {
    
    
    const {t} = useTranslation("common")

    return (
        <Box>

            <HStack fontWeight="bold">
                <Text color="#C2C1CF" fontSize="14px"> {t("blogDetails.blog_head_1")}{">"}</Text><Text fontSize="14px" >{t("blogDetails.blog_head_2")}</Text>
            </HStack>
            <Image
                objectFit="cover"
                mt="20px"
                width="1216px"
                h="420px"
                borderRadius="16px"
                src={`${baseUrl}${imagePath}`}></Image>
        </Box>
    )
}