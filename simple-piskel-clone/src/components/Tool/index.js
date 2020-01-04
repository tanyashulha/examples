import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  toggleButton: {
    border: 'none',
    backgroundColor: '#3f51b5',
  },
  buttonIcon: {
   color: '#D7D7D7',
  }
});

export default function Tool(props) {
  const classes = useStyles();
  const { title, value, children } = props;

  return (
    <Tooltip title={title} placement="right">
      <ToggleButton className={classes.toggleButton} value={value}>
          <span className={classes.buttonIcon}>{children}</span>
      </ToggleButton>
    </Tooltip>
  );
}