import {combineReducers} from "redux";
import quotes from "./QuotesReducer";

const rootReducer = combineReducers({
  quotes
});

export default rootReducer;
