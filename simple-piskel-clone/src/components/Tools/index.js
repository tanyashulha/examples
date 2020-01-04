import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles({
  toggleButtonGroup: {
    flexDirection: 'column',
    border: '1px solid #292929',
  },
  toggleButton: {
    border: 'none',
    backgroundColor: '#292929',
  },
  buttonIcon: {
   color: '#cbb74d',
  }
});

export default function Tools({activeTool, tools, handleToolChange}) {
  const classes = useStyles();
  
  tools = tools.map((tool, key) => {
    const { title, value, icon } = tool;

    return (
      <ToggleButton title={title} key={key} className={classes.toggleButton} value={value}>
          <span className={classes.buttonIcon}>{icon}</span>
      </ToggleButton>
    )
  })

  return (
    <Grid container direction="column" item xs={2}>
      <Grid item>
        <ToggleButtonGroup value={activeTool} className={classes.toggleButtonGroup} exclusive onChange={(e, value) => handleToolChange(value)}>
            {tools}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
