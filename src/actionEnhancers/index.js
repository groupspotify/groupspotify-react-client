import { push } from 'connected-react-router';
import actions from '../actions';
// import { plannerActionCreator } from '../actionCreators';

export const routeActionEnhancer = store => next => action => {
  switch (action.type) {

  case actions.AUTH_LOGOUT:
    next(action);
    store.dispatch(push('/'));
    break;
  default:
    next(action);
    break;
  }
};
