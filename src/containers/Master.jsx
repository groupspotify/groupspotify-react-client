import React, { Component } from 'react';
import { connect } from 'react-redux';
import Playback from './Playback';
import Typography from '@material-ui/core/Typography';

import {
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import SimpleList from './SimpleList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {appStyles} from './theme'

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

    list: {
        width: 500
    }

});


class Master extends Component {
    constructor(props){
        super(props)
    }
    UNSAFE_componentWillMount(){
        if(!this.props.player){
            this.props.history.push('/')
        }
    }
    
render(){
    const { classes } = this.props;
    return (

        <div className="Master">
            <Grid container spacing={24} direction={'row'}>

                <Grid item xs={12} lg={6}>
                    <Playback />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Paper className={classes.list}>
                        <SimpleList />
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={8}>
                <Typography component="h1" variant="h5">
                {this.props.slave_link==null?
                    (null):(
                        <p>Send this <a href={this.props.slave_link} target="_blank">link</a> to your friends</p>
                 )}
                </Typography>
                   
                </Grid>
            </Grid>
        </div>

    );
}
    
}
const mapStatetoProps = state => ({
    slave_link: state.link || null,
    player: state.player ||null,
  });
  export default withStyles(styles)(
    withRouter(
      connect(
        mapStatetoProps,
        null
      )(Master)
    )
  );
