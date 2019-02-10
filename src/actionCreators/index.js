import actions from "../actions";
import solace from "solclientjs";
//solace = require('solclientjs').debug;
const factoryProps = new solace.SolclientFactoryProperties();
const TopicSubscriber = function(solaceModule, topicName) {
  "use strict";
  var solace = solaceModule;
  var subscriber = {};
  subscriber.session = null;
  subscriber.topicName = topicName;
  subscriber.subscribed = false;

  // Logger
  subscriber.log = function(line) {
    var now = new Date();
    var time = [
      ("0" + now.getHours()).slice(-2),
      ("0" + now.getMinutes()).slice(-2),
      ("0" + now.getSeconds()).slice(-2)
    ];
    var timestamp = "[" + time.join(":") + "] ";
    console.log(timestamp + line);
  };

  subscriber.subscribe = function() {
    if (subscriber.session !== null) {
      if (subscriber.subscribed) {
        subscriber.log(
          'Already subscribed to "' +
            subscriber.topicName +
            '" and ready to receive messages.'
        );
      } else {
        subscriber.log("Subscribing to topic: " + subscriber.topicName);
        try {
          subscriber.session.subscribe(
            solace.SolclientFactory.createTopicDestination(
              subscriber.topicName
            ),
            true, // generate confirmation when subscription is added successfully
            subscriber.topicName, // use topic name as correlation key
            10000 // 10 seconds timeout for this operation
          );
        } catch (error) {
          subscriber.log(error.toString());
        }
      }
    } else {
      subscriber.log(
        "Cannot subscribe because not connected to Solace message router."
      );
    }
  };
};
factoryProps.profile = solace.SolclientFactoryProfiles.version10;
solace.SolclientFactory.init(factoryProps);

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
    var topicName;
    player.on("ready", data => {
      console.log("Let the music play on!");
      var d = new Date();
      var n = d.getTime();
      window.topicName = n;
      // group id
      let link = "http://localhost:3000/slave?GID=" + n;
      dispatch({
        type: actions.SLAVE_LINK,
        payload: link
      });
      dispatch({
        type: actions.UPDATE_GID,
        payload: n
      });
      var subscriber = new TopicSubscriber(solace, n);
      subscriber.session = solace.SolclientFactory.createSession({
        // solace.SessionProperties
        url: "ws://mr4b11zr9cb.messaging.mymaas.net:80",
        vpnName: "msgvpn-4b11zr9bh",
        userName: "solace-cloud-client",
        password: "rr87cgf6d4qi9d5fqiun1sf1uv"
      });
      subscriber.session.on(
        solace.SessionEventCode.SUBSCRIPTION_ERROR,
        function(sessionEvent) {
          console.log(
            "Cannot subscribe to topic: " + sessionEvent.correlationKey
          );
        }
      );
      subscriber.session.on(solace.SessionEventCode.SUBSCRIPTION_OK, function(
        sessionEvent
      ) {
        console.log(
          "Successfully changed topic: " + sessionEvent.correlationKey
        );
      });
      // define message event listener
      subscriber.session.on(solace.SessionEventCode.MESSAGE, function(message) {
        console.log(
          'Received message: "' +
            message.getBinaryAttachment() +
            '", details:\n' +
            message.dump()
        );
      });
      subscriber.session.on(solace.SessionEventCode.UP_NOTICE, sessionEvent => {
        // subscriber.log('=== Successfully connected and ready to subscribe. ===');

        console.log("Subscribing to topic: " + subscriber.topicName);
        try {
          subscriber.session.subscribe(
            solace.SolclientFactory.createTopicDestination("topic"),
            true, // generate confirmation when subscription is added successfully
            "topic", // use topic name as correlation key
            10000 // 10 seconds timeout for this operation
          );
        } catch (error) {
          console.log(error.toString());
        }
      });
      try {
        subscriber.session.connect();
      } catch (error) {
        subscriber.log(error.toString());
      }
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
