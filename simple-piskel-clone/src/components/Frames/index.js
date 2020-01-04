import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Frame from '../Frame/';

class Frames extends Component {
  render() {
    const frames = this.props.frames.map((frame, index) => 
      <Frame 
        key={index}
        index={index}
        active={frame.active} 
        image={frame.image} 
        setActiveFrame={this.props.setActiveFrame}
        deleteFrame={this.props.deleteFrame}
        cloneFrame={this.props.cloneFrame}
      />
    );

    return (
    <Grid container direction="column" wrap="nowrap" spacing={2} alignItems="center" item xs={2} >
      <Grid item>
        {frames}
      </Grid>
      <Grid item>
        <Fab color="primary" aria-label="Add" onClick={this.props.addFrame}>
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
    );
  }
}

export default Frames;
