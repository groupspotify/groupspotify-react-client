import actions from "../actions";
import {initSubscriber,initPublisher} from '../services/solace'
import initPlayer from '../services/spotify'
const play = ({
  spotify_uri,
  playerInstance: {
    _options: { getOAuthToken, id }
  }
}) => {
  getOAuthToken(access_token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
      }
    });
  });
};
var subscriber;
var publisher;
var player;

export const authActionCreator = message => async dispatch =>{
  switch(message){
    case 'FAILED':
      dispatch({
        type: actions.AUTH_FAILED
      });
      return;
    case 'STARTED':
      dispatch({
        type: actions.AUTH_STARTED
      });
      return;
    default:
      dispatch({
        type: actions.AUTH_SUCCEEDED,
        payload:message
      });
      return;
  }
}

export const playerActionCreator = tokens => async dispatch => {
  dispatch({
    type: actions.PLAYER_STARTED
  });
  try {
    player = await initPlayer(tokens.access_token, tokens.refresh_token);
    await player.connect();
    console.log(player)

    if (await player.connect()) {
      dispatch({
        type: actions.PLAYER_SUCCEEDED,
        payload: player
      });
      var d = new Date();
      var topicName = d.getTime().toString();
      
      let link = "http://localhost:3000/slave?gid=" + topicName;
        dispatch({
          type: actions.SLAVE_LINK,
          payload: link
        });
        dispatch({
          type: actions.UPDATE_GID,
          payload: topicName
        });

      subscriber = initSubscriber(topicName)
      subscriber.run();
    } else {
      dispatch({
        type: actions.PLAYER_FAILED
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.PLAYER_FAILED
    });
  }
};

export const queueActionCreator = queue => dispatch => {};
export const playActionCreator = playerInstance => async dispatch => {
  await playerInstance.connect();
  await play({
    spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
    playerInstance
  });
  dispatch({
    type: actions.PLAYING
  });

  //dispatch(togglePlayPauseActionCreator(playerInstance))
};

export const togglePlayPauseActionCreator = playerInstance => async dispatch => {
  if (playerInstance == null) {
    // TODO: prompt an error message
    return;
  }
  playerInstance.togglePlay().then(() => {
    console.log("Toggled playback!");
  });
};

export const nextActionCreator = playerInstance => async dispatch => {
  if (playerInstance == null) {
    //TODO: prompt an error message
    return;
  }
  playerInstance.nextTrack().then(() => {
    console.log("Skipped to next track!");
  });
};
export const prevActionCreator = playerInstance => async dispatch => {
  if (playerInstance == null) {
    //TODO: prompt an error message
    return;
  }
  playerInstance.previousTrack().then(() => {
    console.log("Set to previous track!");
  });
};

export const gidActionCreator = gid => async dispatch =>{
  dispatch({
    type: actions.UPDATE_GID,
    payload:gid
  });
}
export const initilizeSlave = topicName => async dispatch =>{
  dispatch({
    type: actions.INIT_SLAVE_STARTED
  });
  subscriber = await initSubscriber(topicName)
  publisher = await initPublisher(topicName)
  try{
    subscriber.run();
    publisher.run();
    dispatch({
      type: actions.INIT_SLAVE_SUCCEEDED
    });
  }catch (error){
    dispatch({
      type: actions.INIT_SLAVE_FAILED,
      payload:error
    });
  }
}

export const publishActionCreator = request => async dispatch =>{
  if (request){
    publisher.publish(request)
  }
}