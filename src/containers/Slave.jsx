import React from 'react';
import { connect } from 'react-redux';
import Playback from './Playback';
import {  
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SimpleList from './SimpleList';

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

  Paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
});


function Slave(props){
  const { classes } = props;

    return (
      
      <div className="Master">
            <Grid container spacing={24} direction={'row'}>
                
                <Grid item xs={12} lg ={6}>
                    <Playback/>
                </Grid>
                
                <Grid item xs={12} lg={6}>
                    <SimpleList/>
                </Grid>
                
                <Grid item xs={12} lg={6}>
                </Grid>
            </Grid>
      </div>
      
    );
    }

    export default withStyles(styles)(Slave);
