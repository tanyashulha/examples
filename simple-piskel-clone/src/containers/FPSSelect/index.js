import React from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { setPreviewFPS } from '../../actions/preview';

const FPSSelect = (props) => {
  return (
    <React.Fragment>
      <InputLabel htmlFor='fps-select'>FPS</InputLabel>
      <Select
        value={props.fps}
        onChange={props.handleChangeFPS}
        input={<InputBase name='fps' id='fps-select' />}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={24}>24</MenuItem>
      </Select>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  fps: state.FPS
});

const mapDispatchToProps = dispatch => ({
  handleChangeFPS: event => {
    dispatch(setPreviewFPS(event))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FPSSelect);
