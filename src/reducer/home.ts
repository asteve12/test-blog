//action

import * as actionTypes from "../actions/home"


type paginationData = {
    limit: number,
    start: number,
    total:number
}


type IAction =
    | { type: typeof actionTypes.FECTH_ARTICLE, payload: { loading: boolean } }
    | { type: typeof actionTypes.FETCH_ARTICLE_FAILURE, payload: { loading: boolean,error:boolean,message:string } }
    | { type: typeof actionTypes.FETCH_ARTICLE_SUCCESS, payload: { loading: boolean ,articles: any []} }
    |  {type: typeof actionTypes.ADD_PAGINATION_DATA, payload:{paginationData:paginationData}}
    | { type: typeof actionTypes.ADD_LATEST_ARTICLE, payload: { article: any } }
    |  { type: typeof actionTypes.SHOW_LOAD_MORE_BTN, payload: { showLoadMoreBtn:boolean } }



type intialState = {
    loading: boolean,
    error: boolean,
    message:string,
    articles: any[],
    paginationData: paginationData | null,
    latestArticle: any,
    showLoadMoreBtn: boolean,
    
 
    }

export const initialState:intialState = {
    loading: false,
    error: false,
    message: "",
    articles: [],
    paginationData: null,
    latestArticle:null,
    showLoadMoreBtn:true
    
}




export const homeReducer = (state:typeof initialState, actions: IAction):typeof initialState => {
    

    switch (actions.type) {
        case actionTypes.FECTH_ARTICLE:
            return {
                ...state,
                loading:actions.payload.loading,
            }
        case actionTypes.FETCH_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: actions.payload.loading,
                articles:actions.payload.articles
                

            }
        
        case actionTypes.FETCH_ARTICLE_FAILURE:
            return {
                ...state,
                error: actions.payload.error,
                message: actions.payload.message,
                loading:actions.payload.loading
            }
        case actionTypes.ADD_PAGINATION_DATA:
            return {
                ...state,
                paginationData:actions.payload.paginationData
            }
        case actionTypes.ADD_LATEST_ARTICLE:
            return {
                ...state,
                latestArticle:actions.payload.article
            }
        case actionTypes.SHOW_LOAD_MORE_BTN:
            return {
                ...state,
                showLoadMoreBtn:actions.payload.showLoadMoreBtn
            }
        default:
            return {
                ...state
            }
            
        
    }
}