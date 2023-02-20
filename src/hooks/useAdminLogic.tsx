import { api } from "@/axios"
import {useRouter} from "next/router"
import { useState } from "react"


export const useAdminLogic = () => {
    const[isDeleting,setIsDeleting] = useState(false) 

    const Router = useRouter()

    const deleteArticle = (articleId: number) => {
        setIsDeleting(true)
        
        api.delete(`/api/articles/${articleId}`)
            .then((response) => {
                alert("successfully deleted article")
                setIsDeleting(false)
                Router.reload()
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