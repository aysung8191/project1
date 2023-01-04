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

let allDecks = [];
let dealerHand = [];
let playerHand = [];


// deck of cards - 52=13*4
const createDeck = ()=> {
    const deck = [];
    suits.forEach((suit) => {
        values.forEach((value) => {
            const card = value + suit;
            deck.push(card);
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
}

// give the option to hit or pass
// - add event listener button (if player has more than 21, then we bust and game is over)
// - if player has < 21, then they can choose to hit or stand
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

// - if hit, add card
// - if pass, let dealer play
const hitPlayer = ()=>{
    const newCard = selectRandomCard();
    playerHand.push(newCard);
    const newCardNode = cardModel.cloneNode(true);
    newCardNode.innerHTML = newCard;
    player.append(newCardNode);
    const handValue = calcValue(playerHand);
    if (handValue > 21){
        console.log('bust');
        alert('bust')
    } 
}

const hitDealer = () => {
    // flip green card
    const hiddenCard = dealer.children[0];
    hiddenCard.classList.remove("back");
    hiddenCard.innerHTML = dealerHand[0];
    // calc hand value
    let handValue = calcValue(dealerHand);
    if(handValue <= 16){
        let newCard = selectRandomCard();
        dealerHand.push(newCard);
        const newCardNode = cardModel.cloneNode(true);
        newCardNode.innerHTML = newCard;
        dealer.append(newCardNode);
        handValue = calcValue(dealerHand);
    }
    // if hand value < 16, hit (add card)
    if(handValue <= 16){
        hitDealer();
    }
    // if value = 21, dealer wins
    else if(handValue === 21) {
        alert('dealer has 21 and wins!');
    }
    // if value > 21 dealer busts
    else if(handValue > 21) {
        alert('dealer busts and player wins!')
    }
    // else decide winner
    else {
        decideWinner();
    }
}

const decideWinner = ()=>{
    let dealerValue = calcValue(dealerHand);
    let playerValue = calcValue(playerHand);
    alert(`Dealer has ${dealerValue}, you have ${playerValue}`);
    if(dealerValue > playerValue) {
        alert('dealer wins!')
    } 
    else if(playerValue > dealerValue){
        alert('player wins!')
    } else {
        alert(`it's a push!`)
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


hitButton.addEventListener('click', hitPlayer);
passButton.addEventListener('click', hitDealer);



shuffleDecks(5);
dealHands();


// determine the winner
// deal the next hand