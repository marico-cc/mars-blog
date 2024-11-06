import { Provider, useDispatch, useSelector } from 'react-redux';
import { Store, combineReducers, legacy_createStore as createStore } from 'redux';
import menu from '@/redux/modules/menu/reducer';
import global from '@/redux/modules/global/reducer';

// 创建reducer(拆分reducer)
const reducer = combineReducers({ menu, global });

// @ts-ignore
const store: Store = createStore(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export { store };
