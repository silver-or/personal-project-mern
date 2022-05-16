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
    article: {},
    isArticleFetched: false,
    articleFetchError: null,
    isUpdated: false,
    updateError: null
}

const FETCH_ARTICLE_REQUEST = 'board/FETCH_ARTICLE_REQUEST'
const FETCH_ARTICLE_SUCCESS = 'board/FETCH_ARTICLE_SUCCESS'
const FETCH_ARTICLE_FAILURE = 'board/FETCH_ARTICLE_FAILURE'
const UPDATE_REQUEST = 'board/UPDATE_REQUEST'
const UPDATE_SUCCESS = 'board/UPDATE_SUCCESS'
const UPDATE_FAILURE = 'board/UPDATE_FAILURE'
const UPDATE_CANCELLED = 'board/UPDATE_CANCELLED'

export const fetchArticleRequest = createAction(FETCH_ARTICLE_REQUEST, data => data)
export const updateRequest = createAction(UPDATE_REQUEST, data => data)
export const updateCancelled = createAction(UPDATE_CANCELLED, data => data)

export function* updateSaga(){
    yield takeLatest(FETCH_ARTICLE_REQUEST, fetchArticle);
    yield takeLatest(UPDATE_REQUEST, updateArticle);
    yield takeLatest(UPDATE_CANCELLED, updateCancel);
}

function* fetchArticle(action){
    try{
        // console.log("***")
        // console.log(JSON.stringify(action.payload))
        const response = yield call(fetchArticleAPI, action.payload)
        const result = response.data.board
        console.log("result" + JSON.stringify(result))
        yield put({type: FETCH_ARTICLE_SUCCESS, payload: result})
    } catch (error) {
        yield put({type: FETCH_ARTICLE_FAILURE, payload: error.message})
    }
}

function* updateArticle(action){
    try{
        const response = yield call(updateAPI, action.payload)
        alert(JSON.stringify(action.payload))
        const result = response.data
        console.log("글 수정 : " + JSON.stringify(result))
        yield put({type: UPDATE_SUCCESS, payload: result})
    } catch (error) {
        yield put({type: UPDATE_FAILURE, payload: error.message})
    }
}

const fetchArticleAPI = payload => axios.get(
    `${SERVER}/board/fetchArticle/${payload.id}`,
    {headers}
)

const updateAPI = payload => axios.post(
    `${SERVER}/board/update/${payload._id}`,
    payload,
    {headers}
)

function* updateCancel(action){
    try { console.log('글 수정 취소') }
    catch (error) {}
}

const update = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [FETCH_ARTICLE_SUCCESS]: (state, action) => ({
        ...state,
        article: action.payload,
        isArticleFetched: true
    }),
    [FETCH_ARTICLE_FAILURE]: (state, action) => ({
        ...state,
        articleFetchError: action.payload
    }),
    [UPDATE_SUCCESS]: (state, action) => ({
        ...state,
        article: action.payload,
        isUpdated: true
    }),
    [UPDATE_FAILURE]: (state, action) => ({
        ...state,
        updateError: action.payload
    }),
}, initialState)

export default update