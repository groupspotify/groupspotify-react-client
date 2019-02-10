import actions from "../actions";

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
      volume:0.2
    });
    player.on("initialization_error", e => {
      console.error(e);
    });
    player.on("authentication_error", e => {
      throw "Authorization error";
    });
    player.on("account_error", e => {
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
    player.on("ready", data => {
      console.log("Let the music play on!");
    });

    if(await player.connect()){
        dispatch({
            type: actions.AUTH_SUCCEEDED,
            payload: player
          });
            var d = new Date();
            var n = d.getTime();
            // group id
            let link = "http://localhost:3000?GID="+n
            dispatch({
                type: actions.SLAVE_LINK,
                payload:link
            })
    }else{
        dispatch({
            type: actions.AUTH_FAILED
          });
    }
    console.log(player);
    
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.AUTH_FAILED
    });
  }
};
var d = new Date();
  var n = d.getTime();
export const playActionCreator = (playerInstance) => async dispatch =>{

    const play = ({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken,
            id
          }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      };
      dispatch({
        type: actions.PLAYING
      });

      await play({
        spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
        playerInstance,
      });

      dispatch(togglePlayPauseActionCreator(playerInstance))
}

export const togglePlayPauseActionCreator = (playerInstance) => async dispatch =>{
    if (playerInstance == null){
        // TODO: prompt an error message
        return
    }
    playerInstance.togglePlay().then(() => {
        console.log('Toggled playback!');
      });
}

export const nextActionCreator = (playerInstance) => async dispatch =>{
    if(playerInstance == null){
        //TODO: prompt an error message
        return
    }
    playerInstance.nextTrack().then(() => {
        console.log('Skipped to next track!');
      });
}
export const prevActionCreator = (playerInstance) => async dispatch =>{
    if(playerInstance == null){
        //TODO: prompt an error message
        return
    }
    playerInstance.previousTrack().then(() => {
        console.log('Set to previous track!');
      });
}



