import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import write, { writeSaga } from './board/write'
import list, { fetchListSaga } from './board/list';
import update, { updateSaga } from './board/update';
import del, { deleteSaga } from './board/delete'
import { HYDRATE } from "next-redux-wrapper"

const rootReducer = combineReducers({
    index: (state = {}, action) => { // 데이터가 콘솔에만 찍히지 않고 화면에 보여지게 하기 위함
        switch (action.type) {
            case HYDRATE:
                console.log("HYDRATE", action);
                return { ...state, ...action.payload };
            default:
                return state;
        }
    },
    write,
    list,
    update,
    del
});
export function* rootSaga() {
  yield all([writeSaga(), fetchListSaga(), updateSaga(), deleteSaga()]);
}

export default rootReducer;