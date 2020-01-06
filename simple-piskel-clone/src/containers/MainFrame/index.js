import React, { Component } from 'react';
import { connect } from "react-redux";
import Canvas from '../../components/Canvas/';
import { CANVAS_SIZE } from '../../constants/canvas';
import { saveFrame } from '../../actions/frames';

class MainFrame extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isDown: false
    };
    this._multiplier = CANVAS_SIZE / this.props.size;
    this._brushSize = this._multiplier * 1;
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.drawPixel = this.drawPixel.bind(this);
    this.erasePixel = this.erasePixel.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.frame.active) {
      this.ctx.clearRect(0, 0, this.props.size, this.props.size);
      this.setImage();
    }

    this.ctx.fillStyle = this.props.color.hex;
    this.ctx.strokeStyle = this.props.color.hex;
    this.ctx.lineWidth = CANVAS_SIZE / this.props.size;
  }

  componentDidMount() {
    this.ctx = this.ref.current.getContext('2d');
    this.ctx.fillStyle = this.props.color.hex;
    this.ctx.strokeStyle = this.props.color.hex;
    this.ctx.lineWidth = CANVAS_SIZE / this.props.size;
    this.setImage();
  }

  setImage() {
    const img = new Image();
    img.src = this.props.frame.image;
    this.ctx.drawImage(img, 0, 0, this.props.size, this.props.size);
  }
	
	drawPixel({offsetX, offsetY}) {
		this.ctx.fillRect(offsetX / this._multiplier, offsetY / this._multiplier, this._brushSize, this._brushSize);
  }

  startStroke({offsetX, offsetY}) {
    this.ctx.beginPath();
    this.ctx.moveTo(offsetX / this._multiplier, offsetY / this._multiplier);
  }

  endStroke({offsetX, offsetY}) {
    this.ctx.lineTo(offsetX / this._multiplier, offsetY / this._multiplier);
    this.ctx.stroke();
  }

  startCircle({offsetX, offsetY}) {
    this.ctx.beginPath();
    this._startX = offsetX / this._multiplier;
    this._startY = offsetY / this._multiplier
    this.ctx.moveTo(this._startX, this._startY);
  }

  endCircle({offsetX, offsetY}) {
    const x = offsetX / this._multiplier - this._startX;
    const y = offsetY / this._multiplier - this._startY;
    this.ctx.arc(x, y, x / 2, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  startRect({offsetX, offsetY}) {
    this._startX = offsetX / this._multiplier;
    this._startY = offsetY / this._multiplier;
  }

  endRect({offsetX, offsetY}) {
    const width = offsetX / this._multiplier - this._startX;
    const height = offsetY / this._multiplier - this._startY;
    this.ctx.fillRect(this._startX, this._startY, width, height);
  }

  erasePixel({offsetX, offsetY}) {
		this.ctx.clearRect(offsetX / this._multiplier, offsetY / this._multiplier, this._brushSize, this._brushSize);
  }
  
  fillCanvas() {
    this.ctx.fillRect(0, 0, this.props.size, this.props.size);
  }

  handleMouseDown(e) {
    switch (this.props.activeTool) {
      case 'pencil':
        this.drawPixel(e);
        break;
      case 'rubber':
        this.erasePixel(e);
        break;
      case 'fill':
        this.fillCanvas();
        break;
      case 'stroke':
        this.startStroke(e);
        break;
      case 'rectangle':
        this.startRect(e);
        break;
      case 'circle':
        this.startCircle(e);
        break;
      default:
        break;
    }

    this.setState({
			isDown: true
    });
	}

  handleMouseMove(e) {
    if (this.state.isDown) {
      switch (this.props.activeTool) {
        case 'pencil':
          this.drawPixel(e);
          break;
        case 'rubber':
          this.erasePixel(e);
          break;
        default:
          break;
      }
    }
	}

  handleMouseUp(e) {
    this.setState({
      isDown: false
    });

    switch (this.props.activeTool) {
      case 'stroke':
        this.endStroke(e);
        break;
      case 'rectangle':
        this.endRect(e);
        break;
      case 'circle':
        this.endCircle(e);
        break;
      default:
        break;
    }
		
	this.props.saveFrame(this.ref.current);
  }

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
  size: state.canvas.size,
  frame: state.frames.find(frame => frame.active),
  activeTool: state.activeTool,
  color: state.colors.primary
});

const mapDispatchToProps = dispatch => ({
  saveFrame: canvas => {
    dispatch(saveFrame(canvas));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFrame);