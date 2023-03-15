import { api } from '@/axios';
import { homeReducer, initialState } from '@/reducer/home';
import { Router } from 'next-translate-routes';
import { useEffect, useReducer } from 'react';
//action types
import * as ActionTypes from '../actions/home';

type IuseHomeLogic = {
  start: number;
  limit: number;
  total: number;
};

export const useHomeLogic = (
  paginationData: IuseHomeLogic,
  currentLanguage: string,
  allArticles: any,
  articles:any
) => {
  const [state, dispatch] = useReducer(homeReducer, initialState);


  useEffect(() => {
    
    dispatch({
      type: ActionTypes.ADD_PAGINATION_DATA,
      payload: { paginationData: paginationData }
    });
    obtainLatestArticle(allArticles);
  }, [currentLanguage]);

  //obtain latest article
  function obtainLatestArticle(allArticles: any): any {
    const articleLength = allArticles?.data?.length;
    const latestArticle = allArticles?.data[articleLength - 1];
    dispatch({ type: ActionTypes.ADD_LATEST_ARTICLE, payload: { article: latestArticle } });
  }

  //fetch more articles  for display
  const loadArticles = async (paginationLimit: number, totalArticleCreated: number, articleIdToExclude:number) => {
  
    const totalArticleFetched = state.articles.length
    const isArticlesStillAvailableForFetch = totalArticleFetched < totalArticleCreated;
    const newPaginationStart =  state.paginationState ? state.paginationState+paginationLimit : paginationLimit 
    const newPaginationLimit = newPaginationStart + paginationLimit;

    if (isArticlesStillAvailableForFetch) {

      console.log("numbersgame", paginationLimit,totalArticleFetched < totalArticleCreated)

      dispatch({ type: ActionTypes.FECTH_ARTICLE, payload: { loading: true } });
      api
        .get(
          `/api/articles/?populate=*&pagination[start]=${newPaginationStart}&pagination[limit]=${newPaginationLimit}&locale=${currentLanguage}&filters[id][$ne]=${articleIdToExclude}`
        )
        .then((response) => {
          const { data } = response;
        dispatch({type:ActionTypes.UPDATE_PAGINATION_COUNT, payload:{paginationState:state.paginationState ?  state.paginationState+paginationLimit: paginationLimit }})
          const fetchedArticles = [...state.articles,...data.data];
         
          console.log("fetch12",[...articles.data,...data.data])  
          dispatch({ type: ActionTypes.ADD_TOTAL_ARTICLE_FETCHED, payload: { totalAricleFetched: fetchedArticles.length } })
          console.log("helloworld",fetchedArticles.length,totalArticleCreated - 1)
          
          const noArticleIsAvailableForFetch = fetchedArticles.length === totalArticleCreated - 1;
          
           
          dispatch({
            type: ActionTypes.FETCH_ARTICLE_SUCCESS,
            payload: { loading: false, articles: fetchedArticles }
          });
        })
        .catch((e) => {
          dispatch({
            type: ActionTypes.FETCH_ARTICLE_FAILURE,
            payload: { error: true, message: e?.message, loading: false }
          });
        });
    }
  };

  return {
    state,
    loadArticles,
    obtainLatestArticle
  };
};
