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
    isDeleted: false,
    deleteError: null
}

const DELETE_REQUEST = 'board/DELETE_REQUEST'
const DELETE_SUCCESS = 'board/DELETE_SUCCESS'
const DELETE_FAILURE = 'board/DELETE_FAILURE'
const DELETE_CANCELLED = 'board/DELETE_CANCELLED'

export const deleteRequest = createAction(DELETE_REQUEST, data => data)
export const deleteCancelled = createAction(DELETE_CANCELLED, data => data)

export function* deleteSaga(){
    yield takeLatest(DELETE_REQUEST, deleteArticle);
    yield takeLatest(DELETE_CANCELLED, deleteCancel);
}

function* deleteArticle(action){
    try{
        // console.log("delete id:"+ action.payload)
        const response = yield call(deleteAPI, action.payload)
        const result = response.data
        console.log("글 삭제")
        yield put({type: DELETE_SUCCESS, payload: result})
    } catch (error) {
        yield put({type: DELETE_FAILURE, payload: error.message})
    }
}

const deleteAPI = payload => axios.post(
    `${SERVER}/board/delete/${payload._id}`,
    payload,
    {headers},
    {withCredentials: true}
)

function* deleteCancel(action){
    try { console.log('글 삭제 취소') }
    catch (error) {}
}

const del = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [DELETE_SUCCESS]: (state, action) => ({
        ...state,
        article: action.payload,
        isDeleted: true
    }),
    [DELETE_FAILURE]: (state, action) => ({
        ...state,
        deleteError: action.payload
    }),
}, initialState)

export default del