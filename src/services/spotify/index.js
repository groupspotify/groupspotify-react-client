import actions from "../../actions";
import {store} from '../../'
// AUTH_LOGOUT

export default async function (refresh_token){
    let player;
    console.log(refresh_token)
    player = new window.Spotify.Player({
        name: "Group Spotify!",
        getOAuthToken: async cb => {
            let access_token;   
            await fetch(`http://localhost:8888/refresh_token?refresh_token=${refresh_token}`,{method: 'GET'})
            .then(async function(response) {
                    return response.json()
                })
                .then(function(myJson) {
                    access_token = myJson.access_token;
                    console.log(access_token)
                });
          cb(access_token);
        },
        volume: 0.2
      });
      player.on("initialization_error", e => {
        console.error(e);
      });
      player.on("authentication_error", e => {
        authFail();
        console.log(e);
      });
      player.on("account_error", e => {
        authFail();
        console.error(e);
      });
      player.on("playback_error", e => {
        console.error(e);
      });
       // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
  
      // Playback status updates
      player.on("player_state_changed", state => {
        console.log(state);
        updateTrackActionCreator(state);

      });
  
      // Ready
      player.on("ready", data => {
        console.log("Let the music play on!");
        // group id
      });
      return player;
}

const authFail = () =>{
  store.dispatch({
      type: actions.AUTH_LOGOUT
    })
}
const updateTrackActionCreator= update =>{
  store.dispatch({
      type: actions.UPDATE_TRACK,
      payload:update
    })
}