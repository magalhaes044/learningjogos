document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
      movePlayer('up');
    } else if (event.key === 'ArrowDown') {
      movePlayer('down');
    } else if (event.key === 'ArrowLeft') {
      movePlayer('left');
    } else if (event.key === 'ArrowRight') {
      movePlayer('right');
    }
  });
  
  function movePlayer(direction) {
    var player = document.getElementById('player');
    var playerPosition = player.getBoundingClientRect();
  
    var gameContainer = document.getElementById('game-container');
    var gameContainerPosition = gameContainer.getBoundingClientRect();
  
    var newPosition = {
      x: playerPosition.left,
      y: playerPosition.top
    };
  
    if (direction === 'up' && playerPosition.top > gameContainerPosition.top) {
      newPosition.y -= 10;
    } else if (direction === 'down' && playerPosition.bottom < gameContainerPosition.bottom) {
      newPosition.y += 10;
    } else if (direction === 'left' && playerPosition.left > gameContainerPosition.left) {
      newPosition.x -= 10;
    } else if (direction === 'right' && playerPosition.right < gameContainerPosition.right) {
      newPosition.x += 10;
    }
  
    player.style.left = newPosition.x + 'px';
    player.style.top = newPosition.y + 'px';
  }