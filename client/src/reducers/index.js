//*8.3
import { combineReducers } from 'redux';
import alert from './alert';

//components can access state from here.
export default combineReducers({
    alert: alert,
});