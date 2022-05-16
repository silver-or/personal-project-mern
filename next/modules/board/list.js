import { createAction, handleActions } from 'redux-actions';
import { call, delay, put, takeLatest, select, throttle } from 'redux-saga/effects';
import { HYDRATE } from "next-redux-wrapper"
import axios from 'axios'

const SERVER = 'http://127.0.0.1:5000'

const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege...",
    withCredentials: true 
}

export const initialState = {
    list: [],
    isFetched: false,
    fetchError: null
}

const FETCH_LIST_REQUEST = 'board/FETCH_LIST_REQUEST';
const FETCH_LIST_SUCCESS = 'board/FETCH_LIST_SUCCESS';
const FETCH_LIST_FAILURE = 'board/FETCH_LIST_FAILURE';

export const fetchListRequest = createAction(FETCH_LIST_REQUEST)

export function* fetchListSaga(){
    yield takeLatest(FETCH_LIST_REQUEST, fetchList);
}

function* fetchList(){
    try {
        const response = yield call(fetchListAPI)
        const result = response.data
        console.log("리스트 가져오기")
        yield put({type: FETCH_LIST_SUCCESS, payload: result})
    } catch (error) {
        yield put({type: FETCH_LIST_FAILURE, payload: error.message})
    }
}

const fetchListAPI = () => axios.get(
    `${SERVER}/board/list`,
    {headers}
)

const list = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [FETCH_LIST_SUCCESS]: (state, action) => ({
        ...state,
        list: action.payload.boards,
        isFetched: true
    }),
    [FETCH_LIST_FAILURE]: (state, action) => ({
        ...state,
        fetchError: action.payload
    }),
}, initialState)

export default list
