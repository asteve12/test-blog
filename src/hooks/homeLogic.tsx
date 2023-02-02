import { api } from "@/axios"
import { homeReducer, initialState } from "@/reducer/home"
import { Router } from "next-translate-routes"
import { useEffect, useReducer } from "react"
//action types
import * as ActionTypes from "../actions/home"



type IuseHomeLogic = {
    start: number,
    limit: number,
    total:number
}


export const useHomeLogic = (paginationData:IuseHomeLogic,currentLanguage:string,allArticles:any) => {
    const [state,dispatch]  = useReducer(homeReducer,initialState)
   
    
    useEffect(() => {
        
        dispatch({type: ActionTypes.ADD_PAGINATION_DATA,payload: { paginationData: paginationData}})
        obtainLatestArticle(allArticles)
},[currentLanguage])

//obtain latest article
    function obtainLatestArticle (allArticles:any):any {
        const articleLength = allArticles?.data?.length;
        const latestArticle = allArticles?.data[articleLength-1]
       dispatch({type: ActionTypes.ADD_LATEST_ARTICLE, payload: {article:latestArticle }})
    }


     //fetch more articles  for display
    const loadArticles = async (paginationLimit: number, totalArticleCreated: number) => {

        const totalArticleFetched = state?.articles?.length;
        const isArticlesStillAvailableForFetch = totalArticleFetched < totalArticleCreated;
        const newPaginationStart = 3;
        const newPaginationLimit = totalArticleFetched + paginationLimit;
        
        if (isArticlesStillAvailableForFetch) {
            dispatch({ type: ActionTypes.FECTH_ARTICLE, payload: { loading: true } })
            api.get(`/api/articles/?populate=*&pagination[start]=${newPaginationStart}&pagination[limit]=${newPaginationLimit}&locale=${currentLanguage}`)
                .then((response) => {
                    const { data } = response
                    const fetchedArticles = [...data.data, ...state.articles]
                    console.log("my-fetcher",fetchedArticles, totalArticleCreated)
                    const noArticleIsAvailableForFetch = fetchedArticles.length+3 >=  totalArticleCreated;
                    if (noArticleIsAvailableForFetch) dispatch({
                        type: ActionTypes.SHOW_LOAD_MORE_BTN, payload: {showLoadMoreBtn:false}})
                    dispatch({ type: ActionTypes.FETCH_ARTICLE_SUCCESS, payload: { loading: false, articles:fetchedArticles } })
                }).
                catch((e) => {
                    dispatch({type: ActionTypes.FETCH_ARTICLE_FAILURE, payload: {error: true,message: e?.message,loading:false}})
                    
                })
            }
    } 
    
   
         

     
    
  

  


    return {
        state,
       loadArticles,
        obtainLatestArticle,
        
    }
}