import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '../features/functions';
function* fetchUser() {
    try {
        //call api and fetch data
        const res = yield call(fetch, 'https://jsonplaceholder.typicode.com/users');
        const data = yield res.json();
        //put data into fetchUserSuccess
        yield put(fetchUserSuccess(data));
    }
    //deals with errors
    catch (error) {
        yield put(fetchUserFailure(error.message));
    }
}
//generator function
function* userSaga() {
    //it will take latest call
    yield takeLatest(fetchUserStart.type, fetchUser);
}

export default userSaga;