import axios from 'axios';
const intialState ={
    id:'',
    loggedIn:false,
    isAdmin:false,
    userArticles:[],
    news:[],
    loading:false
}

//ACTION TYPES USER
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_ARTICLES = 'UPDATE_ARTICLES';

//ACTION TYPES NEWS
const GET_NEWS = 'GET_NEWS';
const GET_NEWS_PENDING = 'GET_NEWS_PENDING';
const GET_NEWS_FULFILLED = 'GET_NEWS_FULFILLED';


//ACTION BUILDERS USER
export const updateUser = (userInfo) => {
    return{
        type: UPDATE_USER,
        payload:{
            id:userInfo.id,
            isAdmin:userInfo.isAdmin,
            loggedIn:userInfo.loggedIn,
            userArticles:userInfo.userArticles
        }
    }
}


export const updateArticles = (articles) => {
return{
    type:UPDATE_ARTICLES,
    payload:articles
}
}

//ACTION BUILDERS NEWS
export const getNews = () =>{
    let news = axios.get("/api/news")
    return{
       type: GET_NEWS,
       payload: news
    }
}

export default function reducer(state = intialState, action){
    switch(action.type){
        case UPDATE_USER:
        return {
                ...state,
                id:action.payload.id,
                isAdmin:action.payload.isAdmin,
                loggedIn:action.payload.loggedIn,
                userArticles:action.payload.userArticles
             };

        case UPDATE_ARTICLES:
        return {...state, userArticles:action.payload};

        case GET_NEWS_PENDING:
        return {...state,loading:true};

        case GET_NEWS_FULFILLED:
        return {...state, loading:false, news:action.payload.data.items}

        default: return {...state};
    }
}
