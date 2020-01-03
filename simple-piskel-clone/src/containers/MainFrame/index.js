import React, { Component } from 'react';
import Canvas from '../../components/Canvas/';

class MainFrame extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  
  render() {
    return (
      <Canvas
        ref={this.ref}
      />
    );
  }
}

export default MainFrame;
