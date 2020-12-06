
import React, { Component } from 'react'
import Card from './Card';
import Navbar from './Navbar';
import './App.css';
import shuffle from 'shuffle-array';

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

export default class MemoryGame extends Component {
  constructor(props) {
    super(props);

    let cards = [
      { id: 0, cardState: CardState.HIDING, backgroundColor: 'red' },
      { id: 1, cardState: CardState.HIDING, backgroundColor: 'red' },
      { id: 2, cardState: CardState.HIDING, backgroundColor: 'navy' },
      { id: 3, cardState: CardState.HIDING, backgroundColor: 'navy' },
      { id: 4, cardState: CardState.HIDING, backgroundColor: 'green' },
      { id: 5, cardState: CardState.HIDING, backgroundColor: 'green' },
      { id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow' },
      { id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow' },
      { id: 8, cardState: CardState.HIDING, backgroundColor: 'black' },
      { id: 9, cardState: CardState.HIDING, backgroundColor: 'black' },
      { id: 10, cardState: CardState.HIDING, backgroundColor: 'purple' },
      { id: 11, cardState: CardState.HIDING, backgroundColor: 'purple' },
      { id: 12, cardState: CardState.HIDING, backgroundColor: 'pink' },
      { id: 13, cardState: CardState.HIDING, backgroundColor: 'pink' },
      { id: 14, cardState: CardState.HIDING, backgroundColor: 'lightsky' },
      { id: 15, cardState: CardState.HIDING, backgroundColor: 'lightsky' }
    ];
    cards = shuffle(cards);
    this.state = { cards, noClick: false, animate: false }
    
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame() {
    let cards = this.state.cards.map(c => ({
      ...c, // destructuring the card state then setting each one to be hiding
      cardState: CardState.HIDING
    }))
    cards = shuffle(cards)
    this.setState({cards})
  }


  // go through the array - map each element - and if the id matches the current card we're looking for then change the state
  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
         }
        }
        return c
     })
    }
    // Grab the card we want out of the array - the one we clicked on
    const foundCard = this.state.cards.find(c => c.id === id);
    // Checking if the ard we clicked on is not hiding as to over ride 
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return 
    }
    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    // Filter that to only get showing cards back 
    const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING)

    const ids = showingCards.map(c => c.id);
    // Now we have an array of showing cards and their ids

    // This is the case when to show the state of the both the cards to matching
    if (showingCards.length === 2 && 
      showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
      // hide them after showing for a little bit
    } else if (showingCards.length === 2) {
      // TODO: WRITE FUNCTION TO ANIMATE

      let hidingCards = mapCardState(cards, ids, CardState.HIDING)

      noClick = true;

      this.setState({ cards, noClick }, () => {
        // call back function to run after the state is set
        setTimeout(() => {
          this.setState({ cards: hidingCards, noClick: false,  })
        }, 1100);
      })
      return;
    }
    // We'll reach this in one of two cases
    // 1 - There is only one card showing that is now matched
    // 2 - There are two cards showing that now do match
    this.setState({cards, noClick})
  }


  render() {
    const cards = this.state.cards.map((card) => (
      <Card
        key={card.id}
        noClick={this.state.noClick}
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)}
      />
    ))
  return(
    <div className="memory-game">
      <Navbar onNewGame={this.handleNewGame}/>
     {cards}
    </div>
  );
}
}

