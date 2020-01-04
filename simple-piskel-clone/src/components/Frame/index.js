import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Description from '@material-ui/icons/Description';
import Tooltip from '@material-ui/core/Tooltip';
import { BACKGROUND, FRAME_SIZE } from '../../constants/canvas';

const useStyles = makeStyles({
  frame: {
    backgroundImage: props => props.image.length ? `url(${props.image}), url(${BACKGROUND})` : `url(${BACKGROUND})`,
    backgroundSize: 'cover',
    height: FRAME_SIZE,
    width: FRAME_SIZE,
    border: '1px solid #8d8f94',
    borderColor: props => props.active ? '#191919' : '#8d8f94',
    display: ' flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  frameButton: {
    border: '1px solid #8d8f94',
    borderColor: props => props.active ? '#191919' : '#8d8f94',
    borderRadius: 0,
    width: 40,
    height: 30
  },
  previewListWrapper: {
    position: ' relative',
    height: '100%',
    overflow: 'hidden'
  },
  previewListScroller: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '100%'
  }
});

export default function Frame(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.frame} onClick={(e) => props.setActiveFrame(e, props.index)}>
      {props.active}
      <Tooltip title="Delete Frame" placement="right">
      <Fab
        aria-label="Delete"
        className={classes.frameButton}
        onClick={() => props.deleteFrame(props.index)}
      >
        <DeleteIcon />
      </Fab>
      </Tooltip>
      <Tooltip title="Copy Frame" placement="right">
      <Fab  
        aria-label="Description" 
        className={classes.frameButton}
        onClick={() => props.cloneFrame(props.index)}
      >
        <Description />
      </Fab>
      </Tooltip>
    </div>
  );
}
