/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './Reducer/reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRestaurants = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.restaurants,
  );

export {
  selectGlobal,
  makeSelectRestaurants,
  selectRouter,
  makeSelectError,
  makeSelectLoading,
};
