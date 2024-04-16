// store/rootReducer.js
import { combineReducers } from 'redux';
import workoutReducer from './workoutSlice';

const rootReducer = combineReducers({
    workout: workoutReducer,
    // Add other reducers as needed
});

export default rootReducer;
