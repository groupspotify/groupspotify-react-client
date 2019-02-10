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
      }
    });
    player.on("initialization_error", e => {
      console.error(e);
    });
    player.on("authentication_error", e => {
      // console.error(e);
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
    await player.connect();
    console.log(player);
    dispatch({
      type: actions.AUTH_SUCCEEDED,
      payload: player
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.AUTH_FAILED
    });
  }
};
