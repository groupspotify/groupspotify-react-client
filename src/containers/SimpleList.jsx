import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper'
import ListItemText from '@material-ui/core/ListItemText';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
 let arr =[]
const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  
});

class SimpleList extends Component {
  render(){
     const { classes } = this.props;
     const {queue} = this.props;
     arr = []
     Object.keys(queue).forEach(function(key) {
       if(arr.indexOf(key) === -1) {
         arr.push(key)
       }
     });    

     return (
    <div className={classes.root}>
    {(Object.keys(queue).length > 0)?(
      <Paper>
      <List component="nav">
      {arr.map((item,key) =>{
        return <ListItem key={key}><ListItemText primary={item}  /></ListItem>
        })}
    </List>
    </Paper>
    ):null}
      
    </div>
  );
  }
 
  
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps = state => ({
  queue: state.queue || null
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapStatetoProps,
      null
    )(SimpleList)
  )
);
