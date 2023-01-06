# project1
SEIR 1212 - Project 1 - BlackJack

I decided to make BlackJack for my first project using HTML/CSS/JavaScript. 

Launch game here: https://aysung8191.github.io/project1/

## BlackJack Game Overview:
Blackjack, also commonly known as twenty-one, is a comparing card game between player(s) and the dealer, where the players competes against the dealer based on their turn. The objective of the game is to beat the dealer in one of the following ways: 
  1. Reach 21 on the player's first draw (first two cards) - called a "blackjack", without a dealer also hitting blackjack. 
  2. Reach a final score higher than the dealer without exceeding 21.
  3. Let the dealer draw additional cards until their hand exceeds 21 - called a "bust". 

## Game Highlights:
* Ace as a special card is evaluated as "1" or "11" depending on player's cards at hand. When a player draws an Ace and the score exceeds 21, the Ace value changes to 1. 
* 5 Decks are used to prevent counting cards.
* The Decks are generated and then shuffled before the start of the game.

![project1screenshot](https://user-images.githubusercontent.com/119904805/210916117-1bde8e07-3705-480e-90e7-dfd01b10ea90.PNG)

## Next Steps: 
* Gambling option - allow players to place wagers before playing their hand.
* Double Down option - after the initial draw, the player would be allowed to double their initial wager and "hit" their hand, but are only allowed to hit that one time - no additional hits or wagers can be placed afterwards. 
* Split option - if the player receives the same value cards on their initial draw, the player would be allowed to place another bet (equivalent to their initial bet) and "split" their hand. Both of those cards would be dealt one more card each and would be played as two separate hands. *IF two of the same cards show up in those two hands, another split can be called as long as the player puts up another bet equivalent to their initial bet. 
* Dealer's Advice - at Casinos, if you're unsure of what to do (hit or stay), you can ask the dealer for advice and they'll tell you what the rulebook would say to do. I wanted to add an option to click on that would pop open a window, evaluate your current hand, compare it to what the dealer is showing, and advise you on what move to take. 
