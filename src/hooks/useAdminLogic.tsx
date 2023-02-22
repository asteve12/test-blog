import { api } from "@/axios"
import { useSession } from "next-auth/react"
import {useRouter} from "next/router"
import { useState } from "react"



export const useAdminLogic = () => {
    const [isDeleting, setIsDeleting] = useState(false) 
    const { data, status } = useSession()
    //@ts-ignore
    const token = data?.user?.authData?.jwt
    
    
    
    console.log("data123",token)

    const Router = useRouter()

    const deleteArticle = (articleId: number,slug:string|undefined) => {
        setIsDeleting(true)
    //    const [deleteCurrentLangVersionRes,]= await Promise.all([
           
    //         api.get(`/api/articles?filters[slug][$ne]=${params?.slug}&populate=*&locale=${locale}`)
    //       ]);
        api.delete(`/api/articles/${articleId}/?locale=all`)
            .then((response) => {
                console.log("asteve12",response)
               
                Router.reload()
            }).then(async () => {

                const singleArticle =await api.get(`/api/articles?filters[slug][$eq]=${slug}&populate=*&locale=fr-BJ`)
                console.log("singleArticle",singleArticle)
                const dataId = singleArticle?.data.data[0]?.id
                const deleteRes = await api.delete(`/api/articles/${dataId}`)
                
                
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
        isDeleting

    }
}