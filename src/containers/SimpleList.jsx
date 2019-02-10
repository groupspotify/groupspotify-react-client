import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
 let arr =[]
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  
});

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

class SimpleList extends Component {
  constructor(props){
    super(props);
    
  }
  componentDidUpdate(){
    console.log("Hi from update");
    
  }
  render(){
     const { classes } = this.props;
     arr = []
     Object.keys(this.props.queue).forEach(function(key) {
       if(arr.indexOf(key) === -1) {
         // this.arr.push(key);
         arr.push(key)
         
       }
     });    

     return (
    <div className={classes.root}>
      <List component="nav">
        {arr.map(item =>{return <ListItem><ListItemText primary={item} /></ListItem>})}
      </List>
    </div>
  );
  }
 
  
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps = state => ({
  queue: state.queue || {}
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapStatetoProps,
      null
    )(SimpleList)
  )
);
