import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { playerActionCreator, playActionCreator } from "../actionCreators";
import React, { Component } from "react";
import { tokenStyles } from "./theme";

class TokenInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }
  login() {
    this.playerCheckInterval = setInterval(() => this.handleToken(), 1000);
  }
  handleToken() {
    if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval);
      this.props.auth(this.state.token);
    }
  }
  onChange = event => {
    this.setState({
      token: event.target.value
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <IconButton className={classes.iconButton} aria-label="Menu">
          <MenuIcon onClick={()=>{this.props.play(this.props.playerinstance)}}/>
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search Google Maps"
          value={this.state.token}
          onChange={this.onChange}
        />
        <Divider className={classes.divider} />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="Directions"
        >
          <DirectionsIcon
            onClick={() => {
              this.login();
            }}
          />
        </IconButton>
      </Paper>
    );
  }
}
const mapStatetoProps = state => ({
  playerinstance: state.player || null
});

const mapDispatchToProps = dispatch => ({
  auth: token => dispatch(playerActionCreator(token)),
  play: (playerinstance)=> dispatch(playActionCreator(playerinstance))
});
export default withStyles(tokenStyles)(
  withRouter(
    connect(
      mapStatetoProps,
      mapDispatchToProps
    )(TokenInput)
  )
);
