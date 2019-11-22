import './style.css';

const state = {
  activeColor: localStorage.getItem('activeColor') || '#fc0000',
  activeControl: localStorage.getItem('activeControl') || 'pencil',
  canvasData: localStorage.getItem('canvasData') || null,
  isDrawing: false
};

const defSize = 512;

async function requestUrl(query) {
  let url;
  if (!query) {
    url = 'https://api.unsplash.com/photos/random?query=town,Minsk&client_id=cbcd6c713eb05f99330576cb3c9c56cce9b446edabf5ff2c80ef834510ac39a6';
  } else url = `https://api.unsplash.com/photos/random?query=town,${query}&client_id=cbcd6c713eb05f99330576cb3c9c56cce9b446edabf5ff2c80ef834510ac39a6`;
  const response = await fetch(url);
  const resultUrl = await response.json();
  return resultUrl;
}

function ControlPanel(view, canvas) {
  this.view = view;
  this.canvas = canvas;
  this.onInit();
}

ControlPanel.prototype.onInit = function onInit() {
  this.handleControlChange = this.handleControlChange.bind(this);
  this.keyboardControlChange = this.keyboardControlChange.bind(this);
  this.handleSearch = this.handleSearch.bind(this);
  this.view.addEventListener('click', this.handleControlChange);
  this.view.addEventListener('keypress', this.handleSearch);
  document.addEventListener('keydown', this.keyboardControlChange);

  if (state.activeControl) {
    document.getElementById(state.activeControl).classList.add('active');
  }
};

ControlPanel.prototype.getTool = function getTool(id) {
  return document.getElementById(id);
};

ControlPanel.prototype.handleControlChange = function handleControlChange(event) {
  state.activeControl = event.target.getAttribute('id');

  const childrens = event.currentTarget.children;
  [...childrens].forEach((children) => {
    children.classList.remove('active');
  });

  event.target.classList.add('active');
  localStorage.setItem('activeControl', state.activeControl);

  if (state.activeControl === 'button-load') {
    requestUrl().then((data) => {
      this.canvas.currentImageData = data;
      this.canvas.renderImage(data);
    });
  }

  if (state.activeControl === 'button-bw') {
    if (state.canvasData === null) {
      alert('Please, upload image!');
    } else {
      this.canvas.changeStyleImage();
    }
  }


  if (state.canvasData !== null) {
    if (state.activeControl === 'tool-min') {
      this.canvas.renderImage(this.canvas.currentImageData);
    }

    if (state.activeControl === 'tool-medium') {
      this.canvas.renderImage(this.canvas.currentImageData, 2);
    }

    if (state.activeControl === 'tool-max') {
      this.canvas.renderImage(this.canvas.currentImageData, 4);
    }
  }
};

ControlPanel.prototype.handleSearch = function handleSearch(e) {
  if (e.key === 'Enter') {
    requestUrl(e.target.value).then((data) => {
      this.canvas.renderImage(data);
      e.target.value = '';
    });
  }
};

ControlPanel.prototype.keyboardControlChange = function keyboardControlChange(event) {
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
  this.onInit();
}

CanvasPanel.prototype.onInit = function onInit() {
  this.handlePaint = this.handlePaint.bind(this);
  this.startDraw = this.startDraw.bind(this);
  this.draw = this.draw.bind(this);
  this.endDraw = this.endDraw.bind(this);
  this.getLineCoord = this.getLineCoord.bind(this);
  this.renderImage = this.renderImage.bind(this);
  this.changeStyleImage = this.changeStyleImage.bind(this);
  this.view.addEventListener('click', this.handlePaint);
  this.view.addEventListener('mousedown', this.startDraw);
  this.view.addEventListener('mousemove', this.draw);
  this.view.addEventListener('mouseup', this.endDraw);

  if (state.canvasData) {
    const img = new Image();
    img.src = state.canvasData;
    img.onload = () => {
      this.view.getContext('2d').drawImage(img, 0, 0);
    };
  }
};

CanvasPanel.prototype.calculateProportions = function calculateProportions(data, base = 1) {
  const size = defSize * base;
  const proportion = Math.min(size / data.width, size / data.height);
  const canvasWidth = data.width * proportion;
  const canvasHeight = data.height * proportion;

  return {
    width: canvasWidth,
    height: canvasHeight,
    positionTop: canvasHeight === size ? 0 : (defSize - canvasHeight) / 2,
    positionLeft: canvasWidth === size ? 0 : (defSize - canvasWidth) / 2
  };
};

CanvasPanel.prototype.renderImage = function renderImage(data, base) {
  this.view.getContext('2d').clearRect(0, 0, defSize, defSize);
  const canvasImage = new Image();
  const b = this.calculateProportions(data, base);
  Object.assign(canvasImage, b, {
    crossOrigin: 'anonymous',
    src: data.urls.small
  });
  canvasImage.onload = () => {
    this.view.getContext('2d').drawImage(canvasImage, canvasImage.positionLeft, canvasImage.positionTop, canvasImage.width, canvasImage.height);
    state.canvasData = this.view.toDataURL();
    localStorage.setItem('canvasData', this.view.toDataURL());
  };
};

CanvasPanel.prototype.changeStyleImage = function changeStyleImage() {
  const imgData = this.view.getContext('2d').getImageData(0, 0, defSize, defSize);
  const pixels = imgData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

    pixels[i] = lightness;
    pixels[i + 1] = lightness;
    pixels[i + 2] = lightness;
  }

  this.view.getContext('2d').putImageData(imgData, 0, 0);
  state.canvasData = this.view.toDataURL();
  localStorage.setItem('canvasData', this.view.toDataURL());
};

CanvasPanel.prototype.handlePaint = function handlePaint() {
  if (state.activeControl === 'paint-bucket') {
    this.view.getContext('2d').fillStyle = state.activeColor;
    this.view.getContext('2d').fillRect(0, 0, defSize, defSize);
    localStorage.setItem('canvasData', this.view.toDataURL());
  }
};

CanvasPanel.prototype.startDraw = function startDraw(event) {
  if (state.activeControl === 'pencil') {
    state.isDrawing = true;
    this.view.getContext('2d').moveTo(event.clientX, event.clientY);
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
      this.view.getContext('2d').fillStyle = state.activeColor;
      const x = event.clientX - this.offsetX;
      const y = event.clientY - this.offsetY;
      if (this.oldX !== null) {
        this.getLineCoord({ x, y }, { x: this.oldX, y: this.oldY }).forEach(({ x, y }) => {
          this.view.getContext('2d').beginPath();
          this.view.getContext('2d').fillRect(x, y, 16, 16);
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
  this.onInit();
}

PalettePanel.prototype.onInit = function onInit() {
  this.handleColorPick = this.handleColorPick.bind(this);
  this.view.addEventListener('click', this.handleColorPick);

  if (state.activeColor) {
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
const controlPanel = new ControlPanel(document.getElementsByClassName('tools')[0], canvasPanel);
const palettePanel = new PalettePanel(document.getElementsByClassName('colors')[0]);
