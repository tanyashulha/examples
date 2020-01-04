import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ToolSelectionGroup from './containers/ToolSelectionGroup/';
import MainFrame from './containers/MainFrame/';
import Pallete from './containers/Pallete';
import Frames from './containers/Frames/';

class App extends Component {
  render() {
    return (
      <Container>
        <Grid container direction="row" alignItems="flex-start" justify="space-between" item xs={12}>
        <Grid item>
          <ToolSelectionGroup />
          <Pallete />
        </Grid>
        <Frames />
        <MainFrame />
        <Grid item>

        </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;