import axios from 'axios';
const intialState = {
    materialId: '',
    //EARTH911 MATERIALS
    materials: [],
    matLoading: false,
    families: [],
    famLoading: false,
    programs: [],
    proLoading: false
}



//PASS MATERIAL ID FOR PRICES COMPONENT
const PASS_MATERIAL_ID = 'PASS_MATERIAL_ID';


//MATERIALS FROM EARTH911 API
const GET_MATERIALS = 'GET_MATERIALS';
const GET_MATERIALS_PENDING = 'GET_MATERIALS_PENDING';
const GET_MATERIALS_FULFILLED = 'GET_MATERIALS_FULFILLED'

const GET_FAMILIES = 'GET_FAMILIES';
const GET_FAMILIES_PENDING = 'GET_FAMILIES_PENDING';
const GET_FAMILIES_FULFILLED = 'GET_FAMILIES_FULFILLED';

const GET_PROGRAMS = 'GET_PROGRAMS';
const GET_PROGRAMS_PENDING = 'GET_PROGRAMS_PENDING';
const GET_PROGRAMS_FULFILLED = 'GET_PROGRAMS_FULFILLED';



export const passMaterialId = (id) => {
    return {
        type: PASS_MATERIAL_ID,
        payload: id
    }
}

//ACTION BULDERS FOR EARTH911 API
export const getMaterials = () => {
    let materials = axios.get('/api/getMaterials');
    return {
        type: GET_MATERIALS,
        payload: materials
    }
}
export const getFamilies = () => {
    let families = axios.get("/api/getFamilies");
    return {
        type: GET_FAMILIES,
        payload: families
    }
}

export const getPrograms = (location) => {
    let programs = axios.get(`/api/getPrograms?lat=${location.lat}&lng=${location.lng}`);
    return {
        type: GET_PROGRAMS,
        payload: programs
    }
}

export default function reducer(state = intialState, action) {

    switch (action.type) {

        case PASS_MATERIAL_ID:
            return { ...state, materialId: action.payload };

        case GET_MATERIALS_PENDING:
            return { ...state, matLoading: true }

        case GET_MATERIALS_FULFILLED:
            return { ...state, matLoading: false, materials: action.payload.data };

        case GET_FAMILIES_PENDING:
            return { ...state, famLoading: true }

        case GET_FAMILIES_FULFILLED:
            return { ...state, famLoading: false, families: action.payload.data };

        case GET_PROGRAMS_PENDING:
            return { ...state, proLoading: true }

        case GET_PROGRAMS_FULFILLED:
            return { ...state, proLoading: false, programs: action.payload.data };

        default: return { ...state };
    }
}