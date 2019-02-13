import actions from "../actions";
import {initSubscriber,initPublisher} from '../services/solace'

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


export const playerActionCreator = token => async dispatch => {
  dispatch({
    type: actions.AUTH_STARTED
  });
  try {
    let player = await new window.Spotify.Player({
      name: "Group Spotify!",
      getOAuthToken: cb => {
        cb(token);
      },
      volume: 0.2
    });
    player.on("initialization_error", e => {
      console.error(e);
    });
    player.on("authentication_error", e => {
      throw "Authorization error";
    });
    player.on("account_error", e => {
      throw "Authorization error";
      console.error(e);
    });
    player.on("playback_error", e => {
      console.error(e);
    });

    // Playback status updates
    player.on("player_state_changed", state => {
      console.log(state);
    });

    // Ready
    var d = new Date();
    var topicName = d.getTime().toString();
    player.on("ready", data => {
      console.log("Let the music play on!");
      // group id
      let link = "http://localhost:3000/slave?gid=" + topicName;
      dispatch({
        type: actions.SLAVE_LINK,
        payload: link
      });
      dispatch({
        type: actions.UPDATE_GID,
        payload: topicName
      });


    // create the subscriber, specifying the name of the subscription topic
    subscriber = initSubscriber(topicName)
    // subscribe to messages on Solace message router
    subscriber.run();
      
    });

    if (await player.connect()) {
      dispatch({
        type: actions.AUTH_SUCCEEDED,
        payload: player
      });
    } else {
      dispatch({
        type: actions.AUTH_FAILED
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.AUTH_FAILED
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