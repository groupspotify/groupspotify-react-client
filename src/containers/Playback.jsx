import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { togglePlayPauseActionCreator, prevActionCreator, nextActionCreator } from "../actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  
});



class Playback extends Component {


  render() {
    const {classes, theme} = this.props
    return (
      <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Live From Space
          </Typography> 
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="Previous" onClick={()=>{this.props.prev(this.props.playerinstance)}}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="Play/pause" onClick={()=>{this.props.toggle(this.props.playerinstance)}}>
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="Next" onClick={()=>{this.props.next(this.props.playerinstance)}}>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
    </Card>
    )
  }
}


const mapStatetoProps = state => ({
  playerinstance: state.player || null
});
const mapDispatchToProps = dispatch => ({
  toggle: (playerinstance)=> dispatch(togglePlayPauseActionCreator(playerinstance)),
  next: (playerinstance) => dispatch(nextActionCreator(playerinstance)),
  prev: (playerinstance) => dispatch(prevActionCreator(playerinstance))
});

Playback.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles , { withTheme: true })(
  withRouter(
    connect(
      mapStatetoProps,
      mapDispatchToProps
    )(Playback)
  )
);
