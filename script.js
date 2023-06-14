var cards = document.querySelectorAll('.card');
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

cards.forEach(function(card) {
  card.addEventListener('click', flipCard);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('hidden');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  var isMatch = firstCard.classList[1] === secondCard.classList[1];
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(function() {
    firstCard.classList.remove('hidden');
    secondCard.classList.remove('hidden');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}