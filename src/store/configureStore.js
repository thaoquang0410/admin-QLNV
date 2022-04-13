import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/index";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";
import {composeWithDevTools} from 'redux-devtools-extension';


const middleware = createSagaMiddleware();

const configStore = () => {
    const store = createStore(rootReducer,{}, composeWithDevTools(applyMiddleware(middleware)));
    middleware.run(rootSaga);
    return store;
}

export default configStore;