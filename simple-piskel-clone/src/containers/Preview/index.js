import React, { Component } from 'react';
import { connect } from 'react-redux';
import PreviewBox from '../../components/PreviewBox';

class Preview extends Component {
  constructor(props) {
    super(props);
    this._timerId = null;
    this.state = {
      counter: 0,
      fullscreen: false
    }

    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.fps !== this.props.fps) {
      this.clearTimer();
      this.setTimer();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  setTimer() {
    this._timerId = setInterval(() => {
      if (this.props.frames[this.state.counter]) {
        this.image = this.props.frames[this.state.counter].image;
      }
      
      this.setState(prevState => ({
        counter: prevState.counter >= this.props.frames.length - 1 ? 0 : prevState.counter + 1
      }));
    }, 1000 / this.props.fps);
  }

  clearTimer() {
    clearInterval(this._timerId);
  }

  toggleFullscreen() {
    this.setState(prevState => ({
      fullscreen: !prevState.fullscreen
    }));
  }

  render() {
    return <PreviewBox image={this.image} fullscreen={this.state.fullscreen} toggleFullscreen={this.toggleFullscreen} />
  }
};

const mapStateToProps = state => ({
  frames: state.frames,
  fps: state.FPS
});

export default connect(mapStateToProps)(Preview);