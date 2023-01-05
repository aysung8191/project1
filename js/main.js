const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♠', '♥', '♣', '♦'];

const cardModel = document.createElement('div');
cardModel.classList.add('card');

const dealer = document.getElementById("dealer");
const player = document.getElementById("player");
const hitButton = document.getElementById("hit-button");
const passButton = document.getElementById("pass-button");
const buttonContainer = document.getElementById("button-container");
const notice = document.getElementById("notice");
const nextHandButton = document.getElementById("next-hand-button");
// const bankEl = document.getElementById("bank");

let allDecks = [];
let dealerHand = [];
let playerHand = [];
// let bank = 500; 


// place bets before game starts
// const placeBet = ()=> {
//     clearHands();
//     let betText = `Place your bets!`
//     showNotice(betText)
// }

// deck of cards - 52=13*4
const createDeck = ()=> {
    const deck = [];
    suits.forEach((suit) => {
        values.forEach((value) => {
            const card = value + suit;
            deck.push(card);
            // console.log(deck)
        });
    });
    return deck;
};

// shuffle several decks
const shuffleDecks = (num) => {
    for (let i=0; i<num; i++){
        const newDeck = createDeck();
        allDecks = [...allDecks, ...newDeck];
    }
}

// select a card (random)
const selectRandomCard = () =>{
    const randomIndex = Math.floor(Math.random()*allDecks.length)
    const card = allDecks[randomIndex];
    allDecks.splice(randomIndex, 1);
    return card;
}

// deal hands to dealer and player
// hide one of dealers cards
const dealHands = () => {
    dealerHand = [selectRandomCard(), selectRandomCard()];
    dealerHand.forEach((card, index)=>{
        const newCard = cardModel.cloneNode(true);
        index === 0 ? newCard.classList.add('back') : newCard.innerHTML = card;
        (card[card.length-1] === '♦' || card[card.length-1] === '♥') && newCard.setAttribute('data-red', true);
        dealer.append(newCard);
    })
    playerHand = [selectRandomCard(), selectRandomCard()];
    playerHand.forEach((card)=>{
        const newCard = cardModel.cloneNode(true);
        newCard.innerHTML = card;
        (card[card.length-1] === '♦' || card[card.length-1] === '♥') && newCard.setAttribute('data-red', true);
        player.append(newCard);
    });
    if (calcValue(playerHand) === 21) {
        let winText = `You hit 21, you win!`
        showNotice(winText);
    }
    if (calcValue(dealerHand) === 21) {
        const hiddenCard = dealer.children[0];
        hiddenCard.classList.remove('back');
        hiddenCard.innerHTML = dealerHand[0];
        let dealer21 = 'Dealer hit 21, Dealer wins!'
        showNotice(dealer21);
    }
}

// what the value of the hand is
const calcValue = (hand)=>{
    let value = 0;
    let hasAce = 0;
    hand.forEach((card)=>{
        if (card.length === 2) {
            if(card[0] === 'A'){
                hasAce += 1;
            }else{
                (card[0] === 'K' || card[0] === 'Q' || card[0] === 'J') ? value += 10 : value += Number(card[0]);
            }
        } else {
            value += 10;
        }
    })
    if(hasAce > 0){
        value + 11 > 21 ? value += 1 : value += 11; 
        value += (hasAce-1);
    }
    return value;
}

const showNotice = (text) => {
    notice.children[0].children[0].innerHTML = text;
    notice.style.display = "flex";
    buttonContainer.style.display = "none";
}

const hideNotice = () => {
    notice.style.display = 'none';
    buttonContainer.style.display = "flex";
}

const decideWinner = () => {
    let playerValue = calcValue(playerHand);
    let dealerValue = calcValue(dealerHand);
    if (playerValue !== dealerValue){
        let text = `Your hand is ${playerHand} with a value of ${playerValue}.
The dealers hand is ${dealerHand} with a value of ${dealerValue}.
${playerValue > dealerValue ? "<em>You win!</em>" : "<em>Dealer Wins!</em>"}`;
    showNotice(text);
    } else {
        let pushText = `Your hand is ${playerHand} with a value of ${playerValue}.
The dealers hand is ${dealerHand} with a value of ${dealerValue}.
It's a push!`
        showNotice(pushText);
    }
}

// - if hit, add card
// - if pass, let dealer play
const hitPlayer = () => {
    const card = selectRandomCard();
    playerHand.push(card);
    let handValue = calcValue(playerHand);
    const newCard = cardModel.cloneNode(true);
    newCard.innerHTML = card;
    player.append(newCard);
    if (handValue > 21){
        let text = `Bust! Your hand is ${playerHand} with a value of ${handValue}.`
        showNotice(text)
    }
}

const hitDealer = () => {
    let handValue = calcValue(dealerHand);
    console.log(handValue);
    // flip red card
    const hiddenCard = dealer.children[0];
    hiddenCard.classList.remove('back');
    hiddenCard.innerHTML = dealerHand[0];
    if (handValue > 16 && handValue < 21) {
        decideWinner();
        return; 
    }
    // if handValue > 21, dealer busts and player wins
    else {
        showNotice(`Dealer busts with a hand of ${handValue}, Player wins!`);
    }
    // if handValue <= 16, hit dealer
    if (handValue <= 16) {
        const card = selectRandomCard();
        dealerHand.push(card)
        const newCard = cardModel.cloneNode(true);
        newCard.innerHTML = card;
        dealer.append(newCard);
        hitDealer();
    } 
}

const clearHands = () =>{
    while (dealer.children.length > 0) {
        dealer.children[0].remove()
    }
    while (player.children.length > 0) {
        player.children[0].remove()
    }
    return true;
}

const play = () =>{
    clearHands();
    hideNotice();
    // place bet function goes here
    // bankEl.innerHTML = `Bank: ${bank}`
    dealHands();
}

hitButton.addEventListener('click', hitPlayer);
passButton.addEventListener('click', hitDealer);
nextHandButton.addEventListener('click', play);

shuffleDecks(5);
play();



// Current Needs:
// - Place Bets function
// - Double down function
// - Split function