import { combineReducers, legacy_createStore } from 'redux';
import todoReducer from '../reducers/todoReducer';



const rootReducer = combineReducers({
  todoList: todoReducer,
});

const store = legacy_createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;