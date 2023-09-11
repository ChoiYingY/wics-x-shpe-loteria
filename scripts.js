/*
  Define global variables here:
    1) isWinning represents a boolean variable that indicate whether current user is winning or not.
    2) cards represents a list of all elements with class name defined as 'card'.
    3) drawBtn represents a button element which id is 'draw-button' from HTML DOM.
      -> This btn will draw a card when it has clicked by user.
    4) restartBtn represents a button element which id is 'refresh-button' from HTML DOM.
      -> This btn will restart the game when clicked.
    5) displayedCards represents an array of cards that has been displayed on game board.
    6) drawnCards represents an array of cards that has already been picked.
    7) gameBoard represent an array of 4by4 bingo gameboard.
       - Default Look:
        | 0 0 0 0 |
        | 0 0 0 0 |
        | 0 0 0 0 |
        | 0 0 0 0 |
*/
var isWinning = false;
var cards = document.getElementsByClassName('card');
var drawBtn = document.getElementById('draw-button');
var restartBtn = document.getElementById('restart-game-button');
var displayedCards = [];
var drawnCards = [];
var gameBoard = Array(16).fill(0);

/*
  A function that returns a random integer in range of [min, max].
*/
function getRandomInt(min, max){
  return Math.floor(Math.random() * max) + min;
}

/*
  A function that returns a random card number that is not seen in given cardSet.
*/
function pickRandomCard(cardSet){
  let cardNum;

  // keep generating random number until it is a number that is never included in given set
  while(true){
    cardNum = getRandomInt(1,20);
    if(!cardSet.includes(cardNum)){
      cardSet.push(cardNum);
      return cardNum;
    }
  }
}

/*
  A function that returns boolean value on whether given 4 bingo spots are filled.
*/
function areSpotsFilled(spot1,spot2,spot3,spot4){
  return gameBoard[spot1] !== 0 && gameBoard[spot2] !== 0 && gameBoard[spot3] !== 0 && gameBoard[spot4] !== 0;
}

/*
  A function that returns boolean value on whether any bingo row has been filled.
*/
function scanWinningRow(){
  console.log(gameBoard)
  filledFirstRow = areSpotsFilled(0,1,2,3);
  filledSecondRow = areSpotsFilled(4,5,6,7);
  filledThirdRow = areSpotsFilled(8,9,10,11);
  filledForthRow = areSpotsFilled(12,13,14,15);
  return filledFirstRow || filledSecondRow || filledThirdRow || filledForthRow;
}

/*
  A function that returns boolean value on whether any bingo column has been filled.
*/
function scanWinningColumn(){
  console.log(gameBoard)
  filledFirstColumn = areSpotsFilled(0,4,8,12);
  filledSecondColumn = areSpotsFilled(1,5,9,13);
  filledThirdColumn = areSpotsFilled(2,6,10,14);
  filledForthColumn = areSpotsFilled(3,7,11,15);
  return filledFirstColumn || filledSecondColumn || filledThirdColumn || filledForthColumn;
}

/*
  A function that returns boolean value on whether any bingo diagonal has been filled.
*/
function scanWinningDiagonal(){
  console.log(gameBoard)
  filledLeftToRightDiagonal = areSpotsFilled(0,5,10,15);
  filledRightToLeftDiagonal = areSpotsFilled(3,6,9,12);
  return filledLeftToRightDiagonal || filledRightToLeftDiagonal;
}

/*
  A function that check if the player has won yet, by validating winning rows/columns/diagonals.
*/
function checkIsWinning(){
  console.log('checkIsWinning');
  winningRow = scanWinningRow();
  winningColumn = scanWinningColumn();
  winningDiagonal = scanWinningDiagonal();
  isWinning = winningRow || winningColumn || winningDiagonal;
  if(isWinning){
    alert('You win!');
  }
}

/*
  Add event listeners that reacts & performs certain action when buttons are clicked.
    - drawBtn will draw a card & render it on page when clicked.
    - restartBtn will refresh the page to start a new game when clicked.
*/
drawBtn.addEventListener('click', () => {
  if(isWinning){
    alert('You have already won the game. Feel free to refresh the page to replay!');
  }
  else{
    if(drawnCards.length < 20){
      cardNum = pickRandomCard(drawnCards);
      const cardImgElem = document.getElementById('drawn-card');
      cardImgElem.src = `./images/cards/${cardNum}.jpg`;
      console.log(drawnCards);
    }
    else{
      alert('There is no more card left becuase you have already drawn all of them out!');
    }
  }
});

restartBtn.addEventListener('click', () => {
  window.location.reload();
});

/*
  Here, we will iterate each card block from cards collection & do the following:
    1) Pick 16 random card images, which will be displayed at each card block element respectively.
    2) Add event listener at each card block so that it will perform desired action when clicked.
    3) Update id attribute of its child element to corresponding card number.
*/
for(var i = 0; i < cards.length; i++){
  // Define current card block & its corresponding index on gameboard
  const currentCard = cards[i];
  const index = i;

  // Pick a random card to be displayed on card board
  const cardNum = pickRandomCard(displayedCards);

  // Pick a random card image to be set as current card block's background image
  currentCard.style.backgroundImage = 'url(./images/cards/' + cardNum + '.jpg)';

  currentCard.addEventListener('click', () => {
    if(isWinning !== true){
      // can't chose bingo card if it is already chosen, no card has been drawn, or unmatched card
      if(drawnCards.length == 0){
        alert('Please draw a card first!');
      }
      else if(drawnCards.slice(-1) != cardNum){
        alert("You can't pick a card that doesn't not match what you have drawn. Please draw a card again.");
      }
      else if(currentCard.children.length < 1){
        // create an image element to be inserted in card block when clicked
        const imgElement = document.createElement('img');
        imgElement.src = 'images/bunny.png';
        imgElement.alt = 'An image of bunny';
        currentCard.appendChild(imgElement);

        // replace new card number on gameboard at index i
        gameBoard.splice(index, 1, cardNum);

        // call function to see if the player has won yet
        checkIsWinning();
      }
    }
    else{
      alert('You have already won the game. Feel free to refresh the page to replay!');
    }
  });
}