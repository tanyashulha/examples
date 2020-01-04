import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { CANVAS_SIZE, BACKGROUND } from '../../constants/canvas';

const useStyles = makeStyles({
  canvas: {
    border: '1px solid #191919',
    backgroundColor: '#292929',
    backgroundImage: `${BACKGROUND}`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
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