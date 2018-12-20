
const intialState ={
    id:'',
    loggedIn:false,
    isAdmin:false,
    materialId:'',
    userArticles:[]
}

//ACTION TYPES
const UPDATE_USER = 'UPDATE_USER';
const PASS_MATERIAL_ID = 'PASS_MATERIAL_ID';
const UPDATE_ARTICLES = 'UPDATE_ARTICLES';


//ACTION BUILDER
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
export const passMaterialId = (id) =>{
    return{
        type:PASS_MATERIAL_ID,
        payload:id
    }
}

export const updateArticles = (articles) => {
return{
    type:UPDATE_ARTICLES,
    payload:articles
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

        case PASS_MATERIAL_ID:
        return {...state, materialId:action.payload};

        case UPDATE_ARTICLES:
        return {...state, userArticles:action.payload};

        default: return {...state};
    }
}
