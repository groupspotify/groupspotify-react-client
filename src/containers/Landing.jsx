import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { playerActionCreator,  authActionCreator } from "../actionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import qs from 'qs';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token: "",
            refresh_token: ""
          };
    }
    UNSAFE_componentWillMount(){
        let access_token = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).access_token;
        let refresh_token = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).refresh_token;
        this.props.auth('STARTED');
        if(access_token && refresh_token){
            this.setState({
                access_token,
                refresh_token
            });
            this.props.auth({access_token, refresh_token});
            this.login();
        }else{
            this.props.auth('FAILED');
        }
    }
    login() {
        this.playerCheckInterval = setInterval(() => this.handleToken(), 1000);
      }
      handleToken() {
        if (window.Spotify !== null) {
          clearInterval(this.playerCheckInterval);
          this.props.player(this.state);
        }
      }
      componentDidUpdate(){
          if (this.props.playerinstance!=null){
            this.props.history.push('/master')
          }
      }
      
    
render(){
    const { classes } = this.props;
  return (
        <div className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
        <div>
                    Get your token from
                    <a href="https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#" target="_blank" rel ="noopener noreferrer">
                    here
                    </a>
                    </div>
                <form className={classes.form}>
                    
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>{window.location='http://localhost:8888/login'}}
                    >
                        Sign in
                    </Button>
                </form>
            </Paper>
        </div>
    );  
}
    
}
const mapStatetoProps = state => ({
    playerinstance: state.player || null
  });
  
  const mapDispatchToProps = dispatch => ({
    player: tokens => dispatch(playerActionCreator(tokens)),
    // play: (playerinstance)=> dispatch(playerActionCreator(playerinstance)),
    auth: (message) => dispatch(authActionCreator(message))
  });

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
    withRouter(
      connect(
        mapStatetoProps,
        mapDispatchToProps
      )(Landing)
    )
  );
  