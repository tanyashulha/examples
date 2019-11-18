const state = {
  activeColor: localStorage.getItem('activeColor') || '#fc0000',
  activeControl: localStorage.getItem('activeControl') || null,
  canvasData: localStorage.getItem('canvasData') || null,
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

  if (state.activeControl) {
    document.getElementById(state.activeControl).classList.add('active');
  }
};

ControlPanel.prototype.getTool = function getTool(id) {
  return document.getElementById(id);
};

ControlPanel.prototype.handleControlChange = function handleControlChange(e) {
  state.activeControl = e.target.getAttribute('id');

  [].forEach.call(e.currentTarget.children, (v) => {
    v.classList.remove('active');
  });

  e.target.classList.add('active');
  localStorage.setItem('activeControl', state.activeControl);
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
  this.offsetX = this.DOM.getBoundingClientRect().x;
  this.offsetY = this.DOM.getBoundingClientRect().y;
  this.oldX = null;
  this.oldY = null;
  this.onInit.apply(this);
}

CanvasPanel.prototype.onInit = function onInit() {
  this.handlePaint = this.handlePaint.bind(this);
  this.startDraw = this.startDraw.bind(this);
  this.draw = this.draw.bind(this);
  this.endDraw = this.endDraw.bind(this);
  this.getLineCoord = this.getLineCoord.bind(this);
  // this.loadImage = this.loadImage.bind(this);
  this.DOM.addEventListener('click', this.handlePaint);
  this.DOM.addEventListener('mousedown', this.startDraw);
  this.DOM.addEventListener('mousemove', this.draw);
  this.DOM.addEventListener('mouseup', this.endDraw);
  // this.DOM.addEventListener('load', this.loadImage);

  if (state.canvasData) {
    const img = new Image();
    img.src = state.canvasData;
    img.onload = () => {
      this.DOM.getContext('2d').drawImage(img, 0, 0);
    };
  }
};

// CanvasPanel.prototype.loadImage = function loadImage() {
//   const url = 'https://api.unsplash.com/photos/random?query=town,Minsk&client_id=44e686577c229c8ac0c98b246f5cfdbc1de65695ac95b2cdad0899957674f5e5';
//   const linkImg = new Image();
//   fetch(url)
//     .then(res => res.json())
//     .then(data => { 
//       linkImg.src = data.url;
//       linkImg.onload = () => {
//         this.DOM.getContext('2d').drawImage(linkImg, 0, 0);
//       }
//     });
// }

CanvasPanel.prototype.handlePaint = function handlePaint() {
  if (state.activeControl === 'paint-bucket') {
    this.DOM.getContext('2d').fillStyle = state.activeColor;
    this.DOM.getContext('2d').fillRect(0, 0, 512, 512);
    localStorage.setItem('canvasData', this.DOM.toDataURL());
  }
};

CanvasPanel.prototype.startDraw = function startDraw(e) {
  if (state.activeControl === 'pencil') {
    state.isDrawing = true;
    const canvas = document.getElementById('drawing-canvas');
    const context = canvas.getContext('2d');
    context.moveTo(e.clientX, e.clientY);
  }
};

CanvasPanel.prototype.getLineCoord = function getLineCoord(p0, p1) {
  let { x, y } = p0;
  const dx = Math.abs(x - p1.x);
  const dy = Math.abs(y - p1.y);

  const sx = (x < p1.x) ? 16 : -16;
  const sy = (y < p1.y) ? 16 : -16;
  let error = dx - dy;
  const coord = [];

  while (true) {
    coord.push({ x, y });
    if ((x < p1.x + 16 && x > p1.x - 16) && (y < p1.y + 16 && y > p1.y - 16)) {
      break;
    }

    const e2 = error * 2;
    if (e2 > -dy) {
      error -= dy;
      x += sx;
    }
    if (e2 < dx) {
      error += dx;
      y += sy;
    }
  }

  return coord;
};

CanvasPanel.prototype.draw = function draw(e) {
  if (state.activeControl === 'pencil') {
    if (state.isDrawing) {
      const canvas = document.getElementById('drawing-canvas');
      const context = canvas.getContext('2d');
      context.fillStyle = state.activeColor;
      const x = e.clientX - this.offsetX;
      const y = e.clientY - this.offsetY;
      // Pencil - normal scope
      // context.fillRect(x, y, 5, 5);
      if (this.oldX !== null) {
        this.getLineCoord({ x, y }, { x: this.oldX, y: this.oldY }).forEach(({ x, y }) => {
          context.beginPath();
          context.fillRect(x, y, 16, 16);
        });
      }
      this.oldX = x;
      this.oldY = y;
    }
  }
};

CanvasPanel.prototype.endDraw = function endDraw() {
  if (state.activeControl === 'pencil') {
    state.isDrawing = false;
    this.oldX = null;
    this.oldY = null;
    localStorage.setItem('canvasData', this.DOM.toDataURL());
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

  if (state.activeColor) {
    this.indicators.getElementsByClassName('current-color')[0].style.backgroundColor = state.activeColor;
  }
};

PalettePanel.prototype.handleColorPick = function handleColorPick(e) {
  if (state.activeControl === 'choose-color') {
    if (e.target.dataset.color) {
      this.indicators.getElementsByClassName('prev-color')[0].style.backgroundColor = state.activeColor;
      state.activeColor = e.target.dataset.color;
      this.indicators.getElementsByClassName('current-color')[0].style.backgroundColor = state.activeColor;
      localStorage.setItem('activeColor', state.activeColor);
    }
    if (e.target.classList.contains('change-colors')) {
      const prevColor = this.indicators.getElementsByClassName('prev-color')[0].style.backgroundColor;
      this.indicators.getElementsByClassName('prev-color')[0].style.backgroundColor = state.activeColor;
      state.activeColor = prevColor;
      this.indicators.getElementsByClassName('current-color')[0].style.backgroundColor = prevColor;
      localStorage.setItem('activeColor', state.activeColor);
    }
  }
};

const canvasPanel = new CanvasPanel(document.getElementsByClassName('canvas')[0]);
const controlPanel = new ControlPanel(document.getElementsByClassName('tools')[0]);
const palettePanel = new PalettePanel(document.getElementsByClassName('colors')[0]);
