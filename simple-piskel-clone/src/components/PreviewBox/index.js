import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import Fullscreen from '@material-ui/icons/Fullscreen';
import Tooltip from '@material-ui/core/Tooltip';
import { BACKGROUND } from '../../constants/canvas';

const useStyles = makeStyles({
  preview: {
    boxSizing: 'border-box',
    backgroundImage: props => props.image ? `url(${props.image}), url(${BACKGROUND})` : `url(${BACKGROUND})`,
    backgroundSize: 'cover',
    height: 200,
    width: 200,
    border: '2px solid #8d8f94',
    display: ' flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 50
  },
  fullscreen: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '25vh',
    height: '50%',
    width: '50vh',
    border: 0
  },
  fullscreenBg: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000'
  },
  previewButton: {
    border: '1px solid #8d8f94',
    borderRadius: 0,
    width: 40,
    height: 30
  },
});


export default function PreviewBox(props) {
  const classes = useStyles(props);
  const activeClasses = props.fullscreen ? `${classes.fullscreen} ${classes.preview}` : classes.preview;
  const modal = <div className={classes.fullscreenBg}></div>;

  return (
    <React.Fragment>
      {props.fullscreen ? modal : null}
      <div className={activeClasses}>
        <Tooltip title="FullScreen" placement="bottom">
            <Fab className={classes.previewButton} onClick={props.toggleFullscreen}>
                <Fullscreen />
            </Fab>
        </Tooltip>
      </div>
    </React.Fragment>
  );
}
