import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_RESTAURANTS_BY_CATEGORIES } from './constants';
import { restaurantsLoaded, restaurantsLoadingError } from './Reducer/actions';
import { all } from '@redux-saga/core/effects';

export function* getRestaurants() {
  console.log('getRestaurants==>');
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `/restaurants/categories/list`;

  try {
    // Call our request helper (see 'utils/request')
    const restaurants = yield call(request, requestURL);
    yield put(restaurantsLoaded(restaurants, {}));
  } catch (err) {
    yield put(restaurantsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* restaurantByCategoriesData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_RESTAURANTS_BY_CATEGORIES, getRestaurants);
}
