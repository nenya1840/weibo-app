import { combineReducers } from 'redux';
import timeline from './timeline';
import comments from './comments';

const rootReducer = combineReducers({
  timeline,
  comments,
});

export default rootReducer;
