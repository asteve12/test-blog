import { api } from "@/axios"
import {useRouter} from "next/router"


export const useAdminLogic = () => {

    const Router = useRouter()

    const deleteArticle = (articleId: number) => {
        alert("")
        api.delete(`/api/articles/${articleId}`)
            .then((response) => {
                alert("successfully deleted article")
                Router.reload()
            }).catch((e) => {
                alert("unable to delete")
                

            })
           
    }
    
    return {
        deleteArticle

    }
}