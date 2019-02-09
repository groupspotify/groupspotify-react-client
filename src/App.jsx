import React, { Component } from 'react';
import { connect } from 'react-redux';
import Playback from './containers/Playback';
import {  
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import { Route, withRouter } from 'react-router-dom';
import AppBar from './containers/AppBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  shadows: ['none'],
});
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
});


class App extends Component {
  constructor(props){
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
      duration: 0,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
      <AppBar />
        <Grid container spacing={24} direction={'row'}>
          <Grid item xs={12} lg ={12}/>
          <Grid item xs={12} lg ={6}>
            <Playback/>
          </Grid>
        </Grid>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(
  withRouter(
    connect(
      null,
      null
    )(App)
    )
);
