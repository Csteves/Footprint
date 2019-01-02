import axios from 'axios';
const intialState ={
    id:'',
    zip:'',
    loggedIn:false,
    isAdmin:false,
    userArticles:[],
    userLocations:[],
    news:[],
    loading:false,
    location:{
        lat:null,
        lng:null
    }
}

//ACTION TYPES USER
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
const UPDATE_LOCATIONS = 'UPDATE_LOCATIONS';
const UPDATE_USER_POSITION = 'UPDATE_USER_POSITION'

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
            userArticles:userInfo.userArticles,
            userLocations:userInfo.userLocations,
            zip:userInfo.zip,

        }
    }
}
export const updateUserPosition= (location) => {
    return{
        type:UPDATE_USER_POSITION,
        payload:{
            lat: location.lat,
            lng: location.lng
        }
    }
}

export const updateArticles = (articles) => {
return{
    type:UPDATE_ARTICLES,
    payload:articles
}
}
export const updateLocations = (locations) => {
return{
    type:UPDATE_LOCATIONS,
    payload:locations
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
                userArticles:action.payload.userArticles,
                userLocations:action.payload.userLocations,
                zip:action.payload.zip
             };
        case UPDATE_USER_POSITION:
        return {...state,location:{lat:action.payload.lat,lng:action.payload.lng}};

        case UPDATE_ARTICLES:
        return {...state, userArticles:action.payload};

        case UPDATE_LOCATIONS:
        return {...state, userLocations:action.payload};

        case GET_NEWS_PENDING:
        return {...state,loading:true};

        case GET_NEWS_FULFILLED:
        return {...state, loading:false, news:action.payload.data.items}

        default: return {...state};
    }
}
