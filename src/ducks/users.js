import axios from 'axios';
const intialState = {
    id: '',
    zip: '',
    loggedIn: false,
    isAdmin: false,
    userCompany: {},
    userArticles: [],
    userLocations: [],
    news: [],
    loading: false,
    location: {
        lat: null,
        lng: null
    },
    companyGeo: {
        lat: null,
        lng: null
    },
    open: false,
    message: ''
}

//ACTION TYPES USER
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
const UPDATE_LOCATIONS = 'UPDATE_LOCATIONS';
const UPDATE_USER_POSITION = 'UPDATE_USER_POSITION';
const UPDATE_USER_COMPANY = 'UPDATE_USER_COMPANY';
const UPDATE_COMPANY_GEO = 'UPDATE_COMPANY_GEO';

// ACTION TYPES SNACKBAR

const HANDLE_OPEN = 'HANDLE_OPEN';
const HANDLE_CLOSE = "HANDLE_CLOSE";

//ACTION TYPES NEWS
const GET_NEWS = 'GET_NEWS';
const GET_NEWS_PENDING = 'GET_NEWS_PENDING';
const GET_NEWS_FULFILLED = 'GET_NEWS_FULFILLED';

const GET_NEWS_T = 'GET_NEWS_T';
const GET_NEWS_T_PENDING = 'GET_NEWS_T_PENDING';
const GET_NEWS_T_FULFILLED = 'GET_NEWS_T_FULFILLED';


//ACTION BUILDERS USER
export const updateUser = (userInfo) => {
    return {
        type: UPDATE_USER,
        payload: {
            id: userInfo.id,
            isAdmin: userInfo.isAdmin,
            loggedIn: userInfo.loggedIn,
            userArticles: userInfo.userArticles,
            userLocations: userInfo.userLocations,
            zip: userInfo.zip,

        }
    }
}
export const updateUserPosition = (location) => {
    return {
        type: UPDATE_USER_POSITION,
        payload: {
            lat: location.lat,
            lng: location.lng
        }
    }
}
export const updateUserCompany = (company) => {
    return {
        type: UPDATE_USER_COMPANY,
        payload: {
            title: company.title,
            address: company.address,
            city: company.city,
            state: company.state,
            phone: company.phone,
            zip: company.zip
        }
    }
}
export const updateCompanyGeo = (location) => {
    return {
        type: UPDATE_COMPANY_GEO,
        payload: {
            lat: location.lat,
            lng: location.lng
        }
    }
}


export const updateArticles = (articles) => {
    return {
        type: UPDATE_ARTICLES,
        payload: articles
    }
}
export const updateLocations = (locations) => {
    return {
        type: UPDATE_LOCATIONS,
        payload: locations
    }
}

export const handleOpen = (message) => {
    return {
        type: HANDLE_OPEN,
        payload: message
    }
}
export const handleClose = (message) => {
    return {
        type: HANDLE_CLOSE,
        payload: message
    }
}

//ACTION BUILDERS NEWS
export const getNews = () => {
    let news = axios.get("/api/news").catch(err => {
        return [];
    });
    return {
        type: GET_NEWS,
        payload: news
    }
}



export const getNewsT = () => {
    let news = axios.get("/api/newsToday")
    return {
        type: GET_NEWS_T,
        payload: news
    }
}

export default function reducer(state = intialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                id: action.payload.id,
                isAdmin: action.payload.isAdmin,
                loggedIn: action.payload.loggedIn,
                userArticles: action.payload.userArticles,
                userLocations: action.payload.userLocations,
                zip: action.payload.zip
            };
        case UPDATE_USER_POSITION:
            return { ...state, location: { lat: action.payload.lat, lng: action.payload.lng } };

        case UPDATE_USER_COMPANY:
            return { ...state, userCompany: action.payload };

        case UPDATE_COMPANY_GEO:
            return { ...state, companyGeo: { lat: action.payload.lat, lng: action.payload.lng } };

        case UPDATE_ARTICLES:
            return { ...state, userArticles: action.payload };

        case UPDATE_LOCATIONS:
            return { ...state, userLocations: action.payload };

        case HANDLE_OPEN:
            return { ...state, open: true, message: action.payload }

        case HANDLE_CLOSE:
            return { ...state, open: false, message: "" }

        case GET_NEWS_PENDING:
            return { ...state, loading: true };

        case GET_NEWS_FULFILLED:
            return { ...state, loading: false, news: action.payload.data.items }

        case GET_NEWS_T_PENDING:
            return { ...state, loading: true };

        case GET_NEWS_T_FULFILLED:
            return { ...state, loading: false, news: action.payload.data.items }

        default: return { ...state };
    }
}
