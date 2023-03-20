import { api } from "@/axios";
import { useState } from "react";
import {useRouter} from "next/router"






type IuseArticleDetailsLogic<T> = {
    paginationInterval: number,
    totalRelatedArticleAvailable: number,
    totalArticleAvailable: T,
    singleArticleCategory:string
    
    

}


export function useArticleDetailsLogic <totalAvailbleType> (props: IuseArticleDetailsLogic<totalAvailbleType>)  {
    const [otherArticleFetched, setOtherArticleFetched] = useState(props.totalArticleAvailable)
    const [paginationCount, setPaginationCount] = useState(3)
    const [fetchArticleStatus, setFetchStatus] = useState(false)
    const [errorMsg,setFetchErrMsg] = useState()
    const Router = useRouter()
    const currentLanguage = Router.locale
    const slug = Router.query.slug
    

     //fetch more articles  for display
  const loadArticles = async (
    paginationInterval: number,
    totalRelatedArticleAvailable: number,
    articleIdToExclude: number) => {
  
      const totalArticleFetched = totalRelatedArticleAvailable
      //@ts-ignore
    const isArticlesStillAvailableForFetch = otherArticleFetched!.length  < totalRelatedArticleAvailable;
    const newPaginationStart = paginationCount+1
    const newPaginationLimit = newPaginationStart + paginationInterval-1;

    if (isArticlesStillAvailableForFetch) {

      
        setFetchStatus(true)
     
      api
        .get(`/api/articles?filters[slug][$ne]=${slug}&populate=*&locale=${currentLanguage}&pagination[start]=${newPaginationStart}&pagination[limit]=${newPaginationLimit}`)
        .then((response) => {
          const { data } = response;
          const fetchedArticles = [...data.data];
          setPaginationCount(newPaginationLimit)
            //@ts-ignore
            setOtherArticleFetched((prev:typeof otherArticleFetched)=> [...prev,...fetchedArticles])
          setFetchStatus(false)
        
          
          
           
         
        })
          .catch((e) => {
              setFetchErrMsg(e?.message)
              setFetchStatus(false)
          
        });
    }
  };
    


    return {

        loadArticles,
        otherArticleFetched

    }
}
