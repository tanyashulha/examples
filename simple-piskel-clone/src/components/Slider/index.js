import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    width: 200,
    padding: 24,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
  
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });
  
  return (
    <Tooltip
      PopperProps={{
        popperRef,
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}
  
ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};
  
export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <Paper className={classes.slider}>
     <Typography gutterBottom>Please, adjust the playback speed of your clip</Typography>
      <Slider
        ValueLabelComponent={ValueLabelComponent}
        aria-label="Custom thumb label"
        defaultValue={15}
      />
    </Paper>
  );
}
