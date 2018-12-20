import { createStore } from 'redux';
import reducer from './ducks/users';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(reducer, composeWithDevTools())