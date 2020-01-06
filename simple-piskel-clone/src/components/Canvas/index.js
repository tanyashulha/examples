import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { CANVAS_SIZE, BACKGROUND, BORDER_DEFAULT } from '../../constants/constants';

const useStyles = makeStyles({
  canvas: {
    border: BORDER_DEFAULT,
    backgroundImage: `url(${BACKGROUND})`,
    backgroundSize: 'cover',
    width: CANVAS_SIZE,
    height: CANVAS_SIZE
  }
});

export default React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <canvas
      ref={ref}
      width={props.size}
      height={props.size}
      className={classes.canvas}
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
      onMouseMove={props.onMouseMove}
    />
  );
});