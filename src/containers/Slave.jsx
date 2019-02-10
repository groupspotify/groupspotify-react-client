import React, {Component} from 'react';
import { connect } from 'react-redux';
import Playback from './Playback';
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import {
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import SimpleList from './SimpleList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import qs from 'qs';
import { gidActionCreator, initilizeSlave } from "../actionCreators";


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


class Slave extends Component {
    constructor(props){
        super(props);
        this.state={
            input:[]
        }
    }
    UNSAFE_componentWillMount(){
        let gid = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).gid
        this.props.updateGid(gid);
        this.props.init(gid);
        console.log(gid);
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

                <Grid item xs={12} lg={4}>
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
                        
                        <Button variant="contained" color="primary" className={classes.button}>
                        Request
                        </Button>
                    </Paper>
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
    init: (gid) => dispatch(initilizeSlave(gid)),
    updateGid: (gid)=> dispatch(gidActionCreator(gid))
  });
  export default withStyles(styles)(
    withRouter(
      connect(
        mapStatetoProps,
        mapDispatchToProps
      )(Slave)
    )
  );
  
