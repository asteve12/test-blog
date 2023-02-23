import { api } from "@/axios"
import { useSession } from "next-auth/react"
import {useRouter} from "next/router"
import React, { useState } from "react"



export const useAdminLogic = () => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [searchBlogRes, setSearchBlogRes] = useState<any[]>([])
    const [inputFieldValue,setInputField] = useState<string>()
    const { data, status } = useSession()
    //@ts-ignore
    const token = data?.user?.authData?.jwt
    
    const Router = useRouter()
    

    const searchForBlog = async (e: React.ChangeEvent) => {
        const inputElement = e.target as HTMLInputElement
        setInputField(inputElement.value)
        const response = await api.get(`/api/articles/?filters[title][$containsi]=${inputElement.value}`)
        const isFetchSuccessful = response.status === 200;
        if (isFetchSuccessful) {
            setSearchBlogRes(response.data.data)
            console.log("response",response.data.data)
            
        }
        
    
}
    const deleteArticle = (articleId: number,slug:string|undefined) => {
        setIsDeleting(true)
    //    const [deleteCurrentLangVersionRes,]= await Promise.all([
           
    //         api.get(`/api/articles?filters[slug][$ne]=${params?.slug}&populate=*&locale=${locale}`)
    //       ]);
        api.delete(`/api/articles/${articleId}/?locale=all`)
            .then((response) => {
                console.log("asteve12",response)
               
    
            }).then(async () => {

                const singleArticle =await api.get(`/api/articles?filters[slug][$eq]=${slug}&populate=*&locale=fr-BJ`)
                console.log("singleArticle",singleArticle)
                const dataId = singleArticle?.data.data[0]?.id
                if (dataId) {
                    await api.delete(`/api/articles/${dataId}`)
                }
              

                Router.reload()
                Router.replace(Router.asPath);
                
                alert("successfully deleted article")
                setIsDeleting(false)
                // if (data) {

                // }
                console.log("data",data)
                
            }).catch((e) => {
                alert("unable to delete")
                setIsDeleting(false)
                

            })
           
    }
    
    return {
        deleteArticle,
        isDeleting,
        searchForBlog,
        searchBlogRes,
        inputFieldValue

    }
}