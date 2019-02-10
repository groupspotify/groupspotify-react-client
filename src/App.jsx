import React, { Component } from "react";
import { connect } from "react-redux";
import Playback from "./containers/Playback";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import AppBar from "./containers/AppBar";
import Input from "./containers/TokenInput";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { appStyles } from "./containers/theme";
import Typography from "@material-ui/core/Typography";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  shadows: ["none"]
});



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0
    };
  }

      

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <AppBar />
          <Grid container spacing={24}>
            <Grid item xs={12} lg={12}>
              
            </Grid>
            <Grid item xs={12} lg={6}>
              <Playback />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Input />
              <Typography component="h5" variant="h5">
              <div>
                Get your token from
                <a href="https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#" target="_blank">
                  here
                </a>
                </div>
                {this.props.slave_link==null?
                (null):(
                  <div>
                    Send this
                  <a href={this.props.slave_link} target="_blank">
                   link 
                  </a>
                  to your friends
                </div>
                )}
                

                

              </Typography>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStatetoProps = state => ({
  slave_link: state.link || null
});

export default withStyles(appStyles)(
  withRouter(
    connect(
      mapStatetoProps,
      null
    )(App)
  )
);
