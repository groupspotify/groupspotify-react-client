import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import actions from "../actions";

export const initialState = {
  player: null,
  error: null,
  songInfo: {
    trackName: null,
    artistName: null,
    albumName: null,
    playing: false,
    position: 0,
    duration: 0
  },
  queue: {},
  link:null
};

const songInfoReducer = (state = false, action) => {
  //TODO. Update song states
  return state;
};

const errorReducer = (state = false, action) => {
  //TODO. Update error state
  return state;
};

const queueReducer = (state = null, action) => {
  //TODO. Send message to Flask with the new queue
  return state;
};

const linkReducer = (state = null, action)=>{
  switch(action.type){
    case actions.SLAVE_LINK:
    console.log(action.payload)
      return action.payload;
    default:
      return null;
  }
}

const playerReducer = (state = null, action) => {
  //TODO
  switch (action.type) {
    case actions.AUTH_FAILED:
      return state;
    case actions.AUTH_STARTED:
      return state;
    case actions.AUTH_SUCCEEDED:
      return action.payload||null;
    default:
      return state;
  }
};

export default history =>
  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    songInfo: songInfoReducer,
    player: playerReducer,
    link:linkReducer
  });
