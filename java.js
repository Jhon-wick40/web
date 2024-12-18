let currentAuction = null;
let currentBid = 0;
let auctionTimer = null;
let timerValue = 60;

function startAuction(itemName, startingPrice) {
  currentAuction = itemName;
  currentBid = startingPrice;
  timerValue = 60;

  document.getElementById("auction-details").classList.remove("hidden");
  document.getElementById("auction-item").querySelector("strong").textContent = itemName;
  document.getElementById("current-bid").querySelector("span").textContent = currentBid;
  document.getElementById("auction-status").textContent = "Auction has started. Place your bids now!";
  document.getElementById("timer").textContent = timerValue;

  clearInterval(auctionTimer); 
  auctionTimer = setInterval(countdown, 1000);

 
  simulateBidders();
}


function placeBid() {
  const bidInput = document.getElementById("bid-amount");
  const bidValue = parseFloat(bidInput.value);

  if (isNaN(bidValue)) {
    alert("Please enter a valid bid.");
    return;
  }

  if (bidValue > currentBid) {
    currentBid = bidValue;
    document.getElementById("current-bid").querySelector("span").textContent = currentBid;
    document.getElementById("auction-status").textContent = `You placed a bid of $${bidValue}!`;
    bidInput.value = "";
  } else {
    document.getElementById("auction-status").textContent = `Your bid must be higher than $${currentBid}.`;
  }
}


function countdown() {
  timerValue--;
  document.getElementById("timer").textContent = timerValue;

  if (timerValue <= 0) {
    clearInterval(auctionTimer);
    endAuction();
  }
}


function simulateBidders() {
  const maxBidFrequency = 2; 
  const biddingInterval = setInterval(() => {
    if (timerValue > 0) {
      const randomBid = currentBid + Math.floor(Math.random() * 1 + 1);
      currentBid = randomBid;
      document.getElementById("current-bid").querySelector("span").textContent = currentBid;
      document.getElementById("auction-status").textContent = `Another participant placed a bid of $${randomBid}.`;
    } else {
      clearInterval(biddingInterval);
    }
  }, Math.random() * maxBidFrequency * 1000);
}

function endAuction() {
  document.getElementById("auction-status").textContent = `Auction ended! Winning bid: $${currentBid}. Congratulations!`;
}
