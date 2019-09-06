import React from 'react';
import styles from './style.scss';
import Play from '../play/play';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            requested: false,
            requested2: false,
            fooddeck: null,
            player1: [],
            player2: [],
            player3: [],
            player4: [],
            player1action: [],
            player2action: [],
            player3action: [],
            player4action: [],
            actiondeck: null
        };
      }
    componentDidMount() {
        var request1 = new XMLHttpRequest();
        var request2 = new XMLHttpRequest();

        var componentThis = this;
        //request for all food cards, shuffling and dealing
        request1.addEventListener("load", function(){
          const responseData = JSON.parse( this.responseText );
          componentThis.setState({requested:true, fooddeck: responseData});
          let fooddeck = componentThis.state.fooddeck;
          componentThis.deckShuffle(fooddeck);
          componentThis.setState(
            {fooddeck: fooddeck});
          let shuffledDeck = componentThis.state.fooddeck;

          componentThis.initialFoodDeal(shuffledDeck);


        });
        request1.open("GET", '/food');
        request1.send();
        //request for all action cards, shuffling and dealing
        request2.addEventListener("load", function(){
          const responseData = JSON.parse( this.responseText );
          componentThis.setState({requested2:true, actiondeck: responseData});
          let actiondeck = componentThis.state.actiondeck;
          componentThis.deckShuffle(actiondeck);
          componentThis.setState(
            {actiondeck: actiondeck});
          let shuffledDeck = componentThis.state.actiondeck;

          componentThis.initialActionDeal(shuffledDeck);

          console.log("didmount is running");
        });
        request2.open("GET", '/action');
        request2.send();
    }
    componentDidUpdate() {
    }

    deckShuffle(deck){
        var ctr = deck.length, temp, index;

    // While there are elements in the array
        while (ctr > 0) {
    // Pick a random index
            index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
            ctr--;
    // And swap the last element with it
            temp = deck[ctr];
            deck[ctr] = deck[index];
            deck[index] = temp;

        }
        return deck;
    }

    initialFoodDeal(shuffledDeck){
        let playerOne = shuffledDeck.slice(0,5);
        let playerTwo = shuffledDeck.slice(5,10);
        let playerThree = shuffledDeck.slice(10,15);
        let playerFour = shuffledDeck.slice(15,20);
        shuffledDeck.splice(0,20);
        this.setState({
            player1: playerOne,
            player2: playerTwo,
            player3: playerThree,
            player4: playerFour,
            fooddeck: shuffledDeck
            });
    }

    initialActionDeal(shuffledDeck){
        let playerOne = shuffledDeck.slice(0,2);
        let playerTwo = shuffledDeck.slice(2,4);
        let playerThree = shuffledDeck.slice(4,6);
        let playerFour = shuffledDeck.slice(6,8);
        shuffledDeck.splice(0,8);
        this.setState({
            player1action: playerOne,
            player2action: playerTwo,
            player3action: playerThree,
            player4action: playerFour,
            actiondeck: shuffledDeck
            });
    }
    render(){
        console.log("render is running");
        console.log(this.state.player1);

        return(
            <div>
                <Play player1={this.state.player1} />
            </div>
       );
    }
}

export default (Game);