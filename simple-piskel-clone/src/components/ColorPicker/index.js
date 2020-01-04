import React, { useState } from 'react';
import { BlockPicker } from 'react-color';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  button: {
    width: 50,
    height: 50,
    border: '4px solid #aaa',
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
