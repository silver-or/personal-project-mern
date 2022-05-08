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
    isWritten: false,
    writeError: null
}

const WRITE_REQUEST = 'board/WRITE_REQUEST';
const WRITE_SUCCESS = 'board/WRITE_SUCCESS';
const WRITE_FAILURE = 'board/WRITE_FAILURE';
const WRITE_CANCELLED = 'board/WRITE_CANCELLED';

export const writeRequest = createAction(WRITE_REQUEST, data => data)
export const writeCancelled = createAction(WRITE_CANCELLED, data => data)

export function* writeSaga(){
    yield takeLatest(WRITE_REQUEST, writeArticle);
    yield takeLatest(WRITE_CANCELLED, writeCancel);
}

function* writeArticle(action){
    try {
        const response = yield call(writeAPI, action.payload)
        alert(JSON.stringify(action.payload))
        const result = response.data
        console.log("글 작성 : " + JSON.stringify(result))
        yield put({type: WRITE_SUCCESS, payload: result})
    } catch (error) {
        yield put({type: WRITE_FAILURE, payload: error.message})
    }
}

const writeAPI = payload => axios.post(
    `${SERVER}/board/write`,
    payload,
    {headers}
)

function* writeCancel(action){
    try { console.log('글 작성 취소') }
    catch (error) {}
}

const write = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [WRITE_SUCCESS]: (state, action) => ({
        ...state,
        article: action.payload,
        isWritten: true
    }),
    [WRITE_FAILURE]: (state, action) => ({
        ...state,
        writeError: action.payload
    }),
}, initialState)

export default write