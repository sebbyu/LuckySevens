function play() {
  var input = document.querySelector('#main-main--betting--betting_price');
  var bettingPrice = parseFloat(input.value).toFixed(2);
  input.value = bettingPrice;
  if (bettingPrice <= 0) {
    alert("The betting price must be larger than $0.00");
    return;
  }
  if (isNaN(bettingPrice)) {
    alert("Your input must be a number.");
    return;
  }
  startRolling(bettingPrice);
  showResult();
}

function playAgain() {
  toggleDisplay(document.querySelector('.footer'));
  toggleDisplay(document.querySelector("#main-main--button-play"));
  document.querySelector('#main-main--betting--betting_price').value = '0.00';
}

function startRolling(bettingPrice) {
  var startingPrice = bettingPrice;
  var numOfRolls = 0;
  var maxWon = bettingPrice;
  var maxWonRolls = 0;
  while (bettingPrice > 0) {
    var sum = rollDice() + rollDice();
    numOfRolls += 1;
    if (sum === 7) {
      bettingPrice += 4;
      if (bettingPrice > maxWon) {
        maxWon = bettingPrice;
        maxWonRolls = numOfRolls;
      }
      continue;
    }
    bettingPrice -= 1;
  }
  setElemValue("#starting_bet", `$${parseFloat(startingPrice).toFixed(2)}`);
  setElemValue("#total_rolls", numOfRolls);
  setElemValue("#highest_amount_won", `$${parseFloat(maxWon).toFixed(2)}`);
  setElemValue("#highest_amount_won_rolls", maxWonRolls);
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function setElemValue(query, value) {
  var q = document.querySelector(query);
  q.textContent = value;
}

function toggleDisplay(elem) {
  // elem.style.display = elem.style.display === "none" ? "block" : "none";
  elem.style.visibility = elem.style.visibility === "hidden" ? "visible" : "hidden";
}

function showResult() {
  toggleDisplay(document.querySelector('.footer'));
  toggleDisplay(document.querySelector("#main-main--button-play"));
}