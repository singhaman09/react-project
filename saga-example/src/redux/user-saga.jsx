import { call, put, takeLatest } from 'redux-saga/effects';
import { getUsersSuccess , getUsersFailure } from './action'


function* usersSaga(){
    try{
      
        const response = yield call(fetch, 'https://dummyjson.com/users')
        const data = yield response.json(); 
        yield put(getUsersSuccess(data?.users ||[]))
    }
    catch(err){
        yield put(getUsersFailure(err?.message ||"please try again"))
    }

}



export default function* rootSaga(){
 yield takeLatest('GET_EMPLOYEE_STARTED', usersSaga)
}
