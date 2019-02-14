import actions from "../../actions";
import {store} from '../../'

export default async function (access_token, refresh_token){
    let player;
    player = new window.Spotify.Player({
        name: "Group Spotify!",
        getOAuthToken: async cb => {
            let access_token;   
            await fetch(`http://localhost:8888/refresh_token?refresh_token=${refresh_token}`,{method: 'GET'})
                .then(async function(response) {
                    console.log("iwj")
                    return  await response.json();
                })
                .then(function(myJson) {
                    console.log("hi")
                    access_token = (JSON.stringify(myJson).access_token);
                });
          cb(access_token);
        },
        volume: 0.2
      });
      player.on("initialization_error", e => {
        console.error(e);
      });
      player.on("authentication_error", e => {
        console.log(e);
      });
      player.on("account_error", e => {
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
      });
  
      // Ready
      player.on("ready", data => {
        console.log("Let the music play on!");
        // group id
      });
      return player;
}