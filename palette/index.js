const state = {
  activeColor: localStorage.getItem('activeColor') || '#fcf800',
  activeControl: localStorage.getItem('activeControl') || null,
  canvasData: localStorage.getItem('canvasData') || null,
  isDrawing: false
};

function Tools(view) {
  this.view = view;
  this.onInit.apply(this);
  this.setActiveControl.apply(this);
}

Tools.prototype.onInit = function onInit() {
  this.handleControlChange = this.handleControlChange.bind(this);
  this.keyboardControlChange = this.keyboardControlChange.bind(this);
  this.view.addEventListener('click', this.handleControlChange);
  document.addEventListener('keydown', this.keyboardControlChange);
};

Tools.prototype.setActiveControl = function setActiveControl() {
  if (state.activeControl !== null) {
    document.getElementById(state.activeControl).classList.add('active');
  }
};

Tools.prototype.getTool = function getTool(id) {
  return document.getElementById(id);
};

Tools.prototype.handleControlChange = function handleControlChange(event) {
  state.activeControl = event.target.getAttribute('id');

  const childrens = event.currentTarget.children;
  [...childrens].forEach((children) => {
    children.classList.remove('active');
  });
  event.target.classList.add('active');

  localStorage.setItem('activeControl', state.activeControl);
};

Tools.prototype.keyboardControlChange = function keyboardControlChange(event) {
  if (event.keyCode === 67) {
    state.activeControl = this.getTool('choose-color').getAttribute('id');
    [...this.view.children].forEach((element) => {
      element.classList.remove('active');
    });
    this.getTool('choose-color').classList.add('active');
  }
  if (event.keyCode === 80) {
    state.activeControl = this.getTool('pencil').getAttribute('id');
    [...this.view.children].forEach((element) => {
      element.classList.remove('active');
    });
    this.getTool('pencil').classList.add('active');
  }
  if (event.keyCode === 66) {
    state.activeControl = this.getTool('paint-bucket').getAttribute('id');
    [...this.view.children].forEach((element) => {
      element.classList.remove('active');
    });
    this.getTool('paint-bucket').classList.add('active');
  }
};

function CanvasPanel(view) {
  this.view = view;
  this.offsetX = this.view.getBoundingClientRect().x;
  this.offsetY = this.view.getBoundingClientRect().y;
  this.oldX = null;
  this.oldY = null;
  this.onInit.apply(this);
  this.setCanvasData.apply(this);
}

CanvasPanel.prototype.onInit = function onInit() {
  this.handlePaint = this.handlePaint.bind(this);
  this.startDraw = this.startDraw.bind(this);
  this.draw = this.draw.bind(this);
  this.endDraw = this.endDraw.bind(this);
  this.getLineCoord = this.getLineCoord.bind(this);
  this.view.addEventListener('click', this.handlePaint);
  this.view.addEventListener('mousedown', this.startDraw);
  this.view.addEventListener('mousemove', this.draw);
  this.view.addEventListener('mouseup', this.endDraw);
};

CanvasPanel.prototype.setCanvasData = function setCanvasData() {
  if (state.canvasData !== null) {
    const img = new Image();
    img.src = state.canvasData;
    img.onload = () => {
      this.view.getContext('2d').drawImage(img, 0, 0);
    };
  }
};

CanvasPanel.prototype.handlePaint = function handlePaint() {
  if (state.activeControl === 'paint-bucket') {
    this.view.getContext('2d').fillStyle = state.activeColor;
    this.view.getContext('2d').fillRect(0, 0, 512, 512);
    localStorage.setItem('canvasData', this.view.toDataURL());
  }
};

CanvasPanel.prototype.startDraw = function startDraw(event) {
  if (state.activeControl === 'pencil') {
    state.isDrawing = true;
    const canvas = document.getElementById('drawing-canvas');
    const context = canvas.getContext('2d');
    context.moveTo(event.clientX, event.clientY);
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

CanvasPanel.prototype.draw = function draw(event) {
  if (state.activeControl === 'pencil') {
    if (state.isDrawing) {
      const canvas = document.getElementById('drawing-canvas');
      const context = canvas.getContext('2d');
      context.fillStyle = state.activeColor;
      const x = event.clientX - this.offsetX;
      const y = event.clientY - this.offsetY;
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
    localStorage.setItem('canvasData', this.view.toDataURL());
  }
};

function PalettePanel(view) {
  this.view = view;
  this.indicators = this.view.parentElement;
  this.onInit.apply(this);
  this.setActiveColor.apply(this);
}

PalettePanel.prototype.onInit = function onInit() {
  this.handleColorPick = this.handleColorPick.bind(this);
  this.getColorCanvas = this.getColorCanvas.bind(this);
  this.view.addEventListener('click', this.handleColorPick);
  this.view.addEventListener('click', this.getColorCanvas);
};

PalettePanel.prototype.setActiveColor = function setActiveColor() {
  if (state.activeColor !== undefined) {
    this.indicators.getElementsByClassName('current-color')[0].style.backgroundColor = state.activeColor;
  }
};

PalettePanel.prototype.handleColorPick = function handleColorPick(event) {
  if (state.activeControl === 'choose-color') {
    if (event.target.dataset.color) {
      this.indicators.getElementsByClassName('prev-color')[0].style.backgroundColor = state.activeColor;
      state.activeColor = event.target.dataset.color;
      this.indicators.getElementsByClassName('current-color')[0].style.backgroundColor = state.activeColor;
      localStorage.setItem('activeColor', state.activeColor);
    }
  }
};

PalettePanel.prototype.getColorCanvas = function getColorCanvas(event) {
  if (state.activeControl === 'choose-color') {
    if (event.target.classList.contains('change-colors')) {
      const prevColor = this.indicators.getElementsByClassName('prev-color')[0].style.backgroundColor;
      this.indicators.getElementsByClassName('prev-color')[0].style.backgroundColor = state.activeColor;
      state.activeColor = prevColor;
      this.indicators.getElementsByClassName('current-color')[0].style.backgroundColor = prevColor;
      localStorage.setItem('activeColor', state.activeColor);
    }
  }
};

const canvasPanel = new CanvasPanel(document.getElementsByClassName('canvas')[0]);
const palettePanel = new PalettePanel(document.getElementsByClassName('colors')[0]);
const tools = new Tools(document.getElementsByClassName('tools')[0], canvasPanel, palettePanel);
