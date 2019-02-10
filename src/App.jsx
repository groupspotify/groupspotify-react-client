import React, { Component } from 'react';
import { connect } from 'react-redux';
import Playback from './containers/Playback';
import {
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import AppBar from './containers/AppBar';
import Landing from './containers/Landing';
import Master from './containers/Master';
import Error from './containers/Error';
import Slave from './containers/Slave';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


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
      duration: 0,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div>
          <AppBar />
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/master" component={Master} />
            <Route path="/slave/" component={Slave} /> 
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>

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
