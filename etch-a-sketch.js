const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeBtn = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// Setup canvas for drawing
const { width } = canvas;
const { height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl( ${hue} , 100%, 50%)`;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// draw function
function draw({ key }) {
  // incriment the hue
  hue += 5;
  ctx.strokeStyle = `hsl( ${hue}, 100%, 50%)`;
  console.log(key);
  // strat the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x and y values depending on what the user did
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// shake/clear function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeBtn.addEventListener('click', clearCanvas);
