import { api } from "@/axios"
import { BlogDetailContent } from "@/component/blogDetails/BlogDetailContent"
import { BlogDetailHeader } from "@/component/blogDetails/BlogDetailHeader"
import { SuggestedArticle } from "@/component/blogDetails/suggestedArticle"

import { Layout } from "@/layout"
import { Box } from "@chakra-ui/react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
//utils
import { estimateArticleReadTime } from "@/util/estimateReadTime"
//hooks
import { useRenderArticles } from "@/hooks/useRenderArticles"
import Seo from "@/component/seo"
import { NextPage,GetStaticProps, GetStaticPaths } from "next"




 type attribute = {
author: string,
authorImage:any,
category:any,
content:any,
createdAt:string,
description:string,
image:any,
locale:string,
localisation:any,
publishedAt:string,
slug:string,
title:string,
updatedAt:string
    
}

 type BlogDetailPage = {
     article: attribute,
     otherArticle: attribute[]

 }




const BlogDetails:NextPage<BlogDetailPage> = ({article,otherArticle}: any) => {
  
  
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL as string
    const articleContent = article?.attributes?.content
    const articleHeader = article?.attributes?.title
    const timeToRead = estimateArticleReadTime(articleContent) 
    const imagePath =  article?.attributes?.image?.data?.attributes?.url
    const otherArticleToRead = useRenderArticles(otherArticle)
    const articleDescription =  article?.attributes?.description
    const seo = {
        metaTitle: articleHeader,
        metaDescription: articleDescription,
        shareImage: imagePath,
        article: true,
      };
    

    return (
        <Layout >
            <Seo  {...seo}/>
            <Box w="100%" pl="5%" pr="5%"  >
                <BlogDetailHeader
                    baseUrl={baseUrl}
                    imagePath={imagePath}
                    
                ></BlogDetailHeader>
                <BlogDetailContent
                    title={articleHeader}
                    content={articleContent}
                    timeToRead={timeToRead}
                   
                ></BlogDetailContent>
                <SuggestedArticle
                otherArticles={otherArticleToRead}
                ></SuggestedArticle>
                
            </Box>
            
        
            
       </Layout>
    )
 }




export const getStaticPaths:GetStaticPaths = async(context: any) => {
   const { locales } =context;
//    const {lang} = context.params
    const allArticles = await api.get(`/api/articles/?populate=*`)
    const path: any[] = []
    

  
    allArticles?.data?.data?.map((eachArticle: any) => {

        locales.map((language:any) => {
            path.push({
                params: {
                    slug: eachArticle?.attributes?.slug
                },
                locale:language

            })
        })


       
    })


   console.log("path",context)
 
    
    return {
        paths:path,
        fallback:false
}

}
 

export const getStaticProps:GetStaticProps = async ({ locale, params }: any) => {
       
    const [singleArticle, otherArticle] = await Promise.all([
            api.get(`/api/articles?filters[slug][$eq]=${params?.slug}&populate=*&locale=${locale}`),
            api.get(`/api/articles?filters[slug][$ne]=${params?.slug}&populate=*&locale=${locale}`)
        ])




    return {
        props: {
            article: singleArticle?.data.data[0],
            otherArticle: otherArticle?.data.data,
            locale,
            ...await serverSideTranslations(locale, ['common']),
        },
        revalidate:1
    }
    
}


export default BlogDetails