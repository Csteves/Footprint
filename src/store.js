import { createStore,applyMiddleware,combineReducers } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import users from './ducks/users';
import materials from './ducks/materials';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    users,
    materials
});

export default createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromiseMiddleware())));