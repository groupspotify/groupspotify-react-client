import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {updateProgressActionCreator} from '../actionCreators';
// TODO[Zahin] This currently doesnt update at any set interval because spotify api does not return every set interval
const styles = {
  root: {
    flexGrow: 1,
  },
};

class ProgressBar extends React.Component {
  

  componentDidMount() {
    this.timer = setInterval(this.props.updateProgress, 500);
  }

  UNSAFE_componentWillMount() {
    clearInterval(this.timer);
  }

  render() {
    const { classes, progress } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress color="secondary" variant="determinate" value={(progress)?((progress.position)*100.0/progress.duration):0} />
      </div>
    );
  }
}
const mapStatetoProps = state => ({
    progress: state.progress || null
  });

const mapDispatchToProps = dispatch => ({
    updateProgress: () => dispatch(updateProgressActionCreator())
  });

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
    withRouter(
      connect(
        mapStatetoProps,
        mapDispatchToProps
      )(ProgressBar)
    )
  );
  
