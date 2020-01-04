import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  canvas: {
    border: '1px solid #191919',
    backgroundColor: '#292929',
    backgroundImage: 'linear-gradient(45deg, #191919 25%, transparent 25%, transparent 75%, #191919 75%, #191919),linear-gradient(45deg, #191919 25%, transparent 25%, transparent 75%, #191919 75%, #191919)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
    width: 512,
    height: 512
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