
import React, { Component } from 'react';
import { connect } from "react-redux";
import Canvas from '../../components/Canvas/';
import { CANVAS_SIZE } from '../../constants/canvas';

class MainFrame extends Component {
 

  render() {
    return (
      <Canvas
        ref={this.ref}
        size={this.props.size}
        onMouseDown={e => {
          let nativeEvent = e.nativeEvent;
          this.handleMouseDown(nativeEvent);
        }}
        onMouseMove={e => {
          let nativeEvent = e.nativeEvent;
          this.handleMouseMove(nativeEvent);
        }}
        onMouseUp={e => {
          let nativeEvent = e.nativeEvent;
          this.handleMouseUp(nativeEvent);
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  activeTool: state.activeTool
});

export default connect(mapStateToProps)(MainFrame);
