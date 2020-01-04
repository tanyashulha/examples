
import React, { Component } from 'react';
import Canvas from '../../components/Canvas/';

class MainFrame extends Component {
  render() {
    return (
      <Canvas
        ref={this.ref}
        size={this.props.size}
      />
    );
  }
}


export default MainFrame;
