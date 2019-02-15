import { push } from 'connected-react-router';
import actions from '../actions';
 import { updateProgressActionCreator } from '../actionCreators';

export const routeActionEnhancer = store => next => action => {
  switch (action.type) {

  case actions.AUTH_LOGOUT:
    next(action);
    store.dispatch(push('/'));
    break;
  // case actions.UPDATE_TRACK:
  // store.dispatch(updateProgressActionCreator(0));
  // next(action);
  default:
    next(action);
    break;
  }
};
