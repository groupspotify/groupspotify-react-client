import React, {Component} from 'react';
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import SimpleList from './SimpleList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import qs from 'qs';
import { topicNameActionCreator, initilizeSlave, publishActionCreator } from "../actionCreators";



const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    request: {
        padding: 10,
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    button: {
        marginTop: 25
    },

    

});


class Slave extends Component {
    constructor(props){
        super(props);
        this.state={
            input:[]
        }
    }
    UNSAFE_componentWillMount(){
        let topicName = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).topicName
        this.props.updateTopicName(topicName);
        this.props.init(topicName);
    }
    
    render(){
      const { classes } = this.props;  
      return (

        <div className="Master">
            <Grid container spacing={24} direction={'row'}>
                <Grid item xs={12} lg={12}>
                    <Paper className={classes.request}>
                        <TextField
                            id="standard-with-placeholder"
                            label="Request a song"
                            placeholder="Despacito"
                            className={classes.textField}
                            value={this.state.input}
                            onChange={(event)=>{this.setState({input:event.target.value})}}
                            margin="normal"
                        />
                        
                        <Button variant="contained" color="primary" className={classes.button} 
                        onClick={()=>{this.props.publish(this.state.input)}}
                        >
                        Request
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={12}>
                    
                        <SimpleList />
                    
                </Grid>
            </Grid>
        </div>

    );
    }
    

    
}



const mapStatetoProps = state => ({
    playerinstance: state.player || null
  });
  
  const mapDispatchToProps = dispatch => ({
    init: (topicName) => dispatch(initilizeSlave(topicName)),
    updateTopicName: (topicName)=> dispatch(topicNameActionCreator(topicName)),
    publish: (request) => dispatch(publishActionCreator(request))
  });
  export default withStyles(styles)(
    withRouter(
      connect(
        mapStatetoProps,
        mapDispatchToProps
      )(Slave)
    )
  );
  
