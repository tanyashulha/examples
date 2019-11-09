const state = {
  activeColor: '#fc0000',
  activeControl: null,
};

function ControlPanel(DOM) {
  this.DOM = DOM;
  this.onInit.apply(this);
}

ControlPanel.prototype.onInit = function onInit() {
  this.handleControlChange = this.handleControlChange.bind(this);
  this.DOM.addEventListener('click', this.handleControlChange);
};

ControlPanel.prototype.handleControlChange = function handleControlChange(e) {
  state.activeControl = e.target.getAttribute('id');

  [].forEach.call(e.currentTarget.children, (v) => {
    v.classList.remove('active');
  });
  e.target.classList.add('active');
};

function CanvasPanel(DOM) {
  this.DOM = DOM;
  this.onInit.apply(this);
}

CanvasPanel.prototype.onInit = function onInit() {
  this.handlePaint = this.handlePaint.bind(this);
  this.DOM.addEventListener('click', this.handlePaint);
};

CanvasPanel.prototype.handlePaint = function handlePaint(e) {
  if (e.target.classList.contains('canvas')) {
    if (state.activeControl === 'paint-bucket') {
      e.target.classList.remove('canvas-background');
      e.target.style.backgroundColor = state.activeColor;
    }
  }
};

const canvasPanel = new CanvasPanel(document.getElementsByClassName('canvas')[0]);
const controlPanel = new ControlPanel(document.getElementsByClassName('tools')[0]);
