// Obtenha o elemento do canvas e seu contexto
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Defina as dimensões do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Defina o tamanho do bloco e o número de blocos no canvas
const blockSize = 20;
const widthInBlocks = Math.floor(canvas.width / blockSize);
const heightInBlocks = Math.floor(canvas.height / blockSize);

// Variável para controlar o intervalo de atualização do jogo
const updateInterval = 100; // 100ms

// Variáveis para armazenar a posição e direção da cobra
let snake = [];
let direction;

// Inicialização do jogo
function init() {
  direction = 'right';

  // Crie a cobra inicialmente com 3 blocos na posição central do canvas
  snake = [
    { x: widthInBlocks / 2, y: heightInBlocks / 2 },
    { x: widthInBlocks / 2 - 1, y: heightInBlocks / 2 },
    { x: widthInBlocks / 2 - 2, y: heightInBlocks / 2 }
  ];

  // Inicie o loop de atualização do jogo
  setInterval(updateGame, updateInterval);
}

// Função para atualizar o estado do jogo
function updateGame() {
  moveSnake();
  checkCollision();
  drawGame();
}

// Função para movimentar a cobra com base na direção atual
function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  // Atualize a posição da cabeça da cobra com base na direção
  if (direction === 'right') {
    head.x += 1;
  } else if (direction === 'left') {
    head.x -= 1;
  } else if (direction === 'up') {
    head.y -= 1;
  } else if (direction === 'down') {
    head.y += 1;
  }

  // Insira a nova posição da cabeça no início do array da cobra
  snake.unshift(head);

  // Remova o último bloco da cauda da cobra
  snake.pop();
}

// Função para verificar colisões
function checkCollision() {
  const head = snake[0];

  // Verifique colisão com as paredes do canvas
  if (
    head.x < 0 || head.x >= widthInBlocks ||
    head.y < 0 || head.y >= heightInBlocks
  ) {
    // Reinicie o jogo
    init();
  }

  // Verifique colisão com o próprio corpo da cobra
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      // Reinicie o jogo
      init();
      break;
    }
  }
}

// Função para desenhar o jogo na tela
function drawGame() {
  // Limpe o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhe a cobra
  snake.forEach(segment => {
    drawBlock(segment.x, segment.y, 'green');
  });
}

// Função para desenhar um bloco no canvas
function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

// Função para definir a direção da cobra com base na tecla pressionada
function setDirection(event) {
  const key = event.key;
  const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  if (validKeys.includes(key)) {
    event.preventDefault();

    if (key === 'ArrowUp' && direction !== 'down') {
      direction = 'up';
    } else if (key === 'ArrowDown' && direction !== 'up') {
      direction = 'down';
    } else if (key === 'ArrowLeft' && direction !== 'right') {
      direction = 'left';
    } else if (key === 'ArrowRight' && direction !== 'left') {
      direction = 'right';
    }
  }
}

// Adicione um ouvinte de eventos para as teclas de seta
document.addEventListener('keydown', setDirection);

// Inicie o jogo
init();
