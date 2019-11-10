const state = {
  activeColor: '#fc0000',
  activeControl: null,
  isDrawing: false
};

function ControlPanel(DOM) {
  this.DOM = DOM;
  this.onInit.apply(this);
}

ControlPanel.prototype.onInit = function onInit() {
  this.handleControlChange = this.handleControlChange.bind(this);
  this.keyboardControlChange = this.keyboardControlChange.bind(this);
  this.DOM.addEventListener('click', this.handleControlChange);
  document.addEventListener('keydown', this.keyboardControlChange);
};

ControlPanel.prototype.getTool = function getTool(id) {
  return document.getElementById(id);
}

ControlPanel.prototype.handleControlChange = function handleControlChange(e) {
  state.activeControl = e.target.getAttribute('id');

  [].forEach.call(e.currentTarget.children, (v) => {
    v.classList.remove('active');
  });
  e.target.classList.add('active');
};

ControlPanel.prototype.keyboardControlChange = function keyboardControlChange(e) {
  if (e.keyCode === 67) {
    state.activeControl = this.getTool('choose-color').getAttribute('id');
    [...this.DOM.children].forEach((el) => {
      el.classList.remove('active');
    });
    this.getTool('choose-color').classList.add('active');
  }
  if (e.keyCode === 80) {
    state.activeControl = this.getTool('pencil').getAttribute('id');
    [...this.DOM.children].forEach((el) => {
      el.classList.remove('active');
    });
    this.getTool('pencil').classList.add('active');
  }
  if (e.keyCode === 66) {
    state.activeControl = this.getTool('paint-bucket').getAttribute('id');
    [...this.DOM.children].forEach((el) => {
      el.classList.remove('active');
    });
    this.getTool('paint-bucket').classList.add('active');
  }
};

function CanvasPanel(DOM) {
  this.DOM = DOM;
  this.onInit.apply(this);
}

CanvasPanel.prototype.onInit = function onInit() {
  this.handlePaint = this.handlePaint.bind(this);
  this.startDraw = this.startDraw.bind(this);
  this.draw = this.draw.bind(this);
  this.endDraw = this.endDraw.bind(this);
  this.DOM.addEventListener('click', this.handlePaint);
  this.DOM.addEventListener('mousedown', this.startDraw);
  this.DOM.addEventListener('mousemove', this.draw);
  this.DOM.addEventListener('mouseup', this.endDraw);
};

// CanvasPanel.prototype.handlePaint = function handlePaint(e) {
//   if (e.target.classList.contains('canvas')) {
//     if (state.activeControl === 'paint-bucket') {
//       e.target.classList.remove('canvas-background');
//       e.target.style.backgroundColor = state.activeColor;
//     }
//   }
// };

// CanvasPanel.prototype.startDraw = function startDraw(e) {
//   if (e.target.classList.contains('canvas')) {
//     if (state.activeControl === 'pencil') {
//       state.isDrawing = true;
//       const context = e.target.getContext('2d');
//       context.lineWidth = 2;
//       context.lineJoin = 'round';
//       context.lineCap = 'round';
//       context.moveTo(e.target.clientX, e.target.clientY);
//     }
//   }
// };

// CanvasPanel.prototype.draw = function draw(e) {
//   if (e.target.classList.contains('canvas')) {
//     if (state.activeControl === 'pencil') {
//       if (state.isDrawing) {
//         const context = e.target.getContext('2d');
//         context.lineTo(e.target.clientX, e.target.clientY);
//         context.stroke();
//       }
//     }
//   }
// };

CanvasPanel.prototype.endDraw = function endDraw(e) {
  if (e.target.classList.contains('canvas')) {
    if (state.activeControl === 'pencil') {
      state.isDrawing = false;
    }
  }
};

function PalettePanel(DOM) {
  this.DOM = DOM;
  this.indicators = this.DOM.parentElement;
  this.onInit.apply(this);
}

PalettePanel.prototype.onInit = function onInit() {
  this.handleColorPick = this.handleColorPick.bind(this);
  this.DOM.addEventListener('click', this.handleColorPick);
};

PalettePanel.prototype.handleColorPick = function handleColorPick(e) {
  if (state.activeControl === 'choose-color') {
    if (e.target.dataset.color) {
      this.indicators.getElementsByClassName('prev-color')[0].style.backgroundColor = state.activeColor;
      state.activeColor = e.target.dataset.color;
      this.indicators.getElementsByClassName('current-color')[0].style.backgroundColor = state.activeColor;
    }
    if (e.target.classList.contains('change-colors')) {
      let prevColor = this.indicators.getElementsByClassName('prev-color')[0].style.backgroundColor;
      this.indicators.getElementsByClassName('prev-color')[0].style.backgroundColor = state.activeColor;
      this.indicators.getElementsByClassName('current-color')[0].style.backgroundColor = prevColor;
    }
  }
};

const canvasPanel = new CanvasPanel(document.getElementsByClassName('canvas')[0]);
const controlPanel = new ControlPanel(document.getElementsByClassName('tools')[0]);
const palettePanel = new PalettePanel(document.getElementsByClassName('colors')[0]);
