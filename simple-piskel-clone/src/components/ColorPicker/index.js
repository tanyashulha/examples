import React, { useState } from 'react';
import { BlockPicker } from 'react-color';
import { makeStyles } from '@material-ui/styles';
import { BUTTON_SIZE, BORDER_ACTIVE } from '../../constants/constants';

const useStyles = makeStyles({
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    border: BORDER_ACTIVE,
    backgroundColor: props => props.color.hex || props.color,
    marginRight: 8,
    marginTop: 16
  },
  picker: {
    position: 'absolute !important',
    marginTop: 10
  }
});

const ColorPicker = props => {
  const classes = useStyles(props);
  const [isVisible, toggleVisible] = useState(0);

  return (
    <React.Fragment>
      <button className={classes.button} onClick={() => toggleVisible(!isVisible)}></button>
      {isVisible ? (<BlockPicker
        className={classes.picker}
        color={props.color}
        onChange={(color) => {
          toggleVisible(false);
          props.onChange(color)
        }}
      />) : null}
    </React.Fragment>
  )
}

export default ColorPicker;
