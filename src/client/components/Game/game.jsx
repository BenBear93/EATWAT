import React from 'react';
import styles from './style.scss';
import Play1 from '../Play/play1.jsx';
import Play2 from '../Play/play2.jsx';
import Play3 from '../Play/play3.jsx';
import Play4 from '../Play/play4.jsx';
import Action1 from '../Action/action1.jsx';
import Action2 from '../Action/action2.jsx';
import Action3 from '../Action/action3.jsx';
import Action4 from '../Action/action4.jsx';

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
            player1turn: true,
            player2turn: false,
            player3turn: false,
            player4turn: false,
            player1action: [],
            player2action: [],
            player3action: [],
            player4action: [],
            player1hand: [],
            player2hand: [],
            player3hand: [],
            player4hand: [],
            player1plate: [],
            player2plate: [],
            player3plate: [],
            player4plate: [],
            actiondeck: null,
            foodround: true,
            actionround: false,
            initialround: true,
            toDeal: true
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
          if (componentThis.state.initialround == true){
            componentThis.initialFoodDeal(shuffledDeck);
          }

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
          if (componentThis.state.initialround == true){
            componentThis.initialActionDeal(shuffledDeck);
          }
        });
        request2.open("GET", '/action');
        request2.send();
    }
    componentDidUpdate() {
        if (this.state.foodround == false && this.state.actionround == false){
            setTimeout(() => this.startAction(), 5000);
        } else if ((this.state.foodround == true) && (this.state.initialround == false) && (this.state.toDeal == true)) {
             setTimeout(()=>this.startFood(), 5000);
        }
        console.log("foodround is",this.state.foodround);
        console.log("action round is",this.state.actionround);
        console.log("initial round is",this.state.initialround)
    }

    startFood(){
        let fooddeck = this.state.fooddeck;
        this.foodDeal(fooddeck);
        console.log("fooddeck left");
        console.log(this.state.fooddeck);
        let actiondeck = this.state.actiondeck;
        this.actionDeal(actiondeck);
        this.setState({
            player1plate: [],
            player2plate: [],
            player3plate: [],
            player4plate: [],
            player1hand: [],
            player2hand: [],
            player3hand: [],
            player4hand: [],
            player1turn: true,
            toDeal: false
        })
    }

    startAction(){
        this.setState({
            actionround: true,
            player1turn: true
        })
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
            }, ()=> {
                console.log("after shuffle, food deck is")
                console.log(this.state.fooddeck);});
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

    actionDeal(actiondeck){
        let player1action = this.state.player1action;
        let player2action = this.state.player2action;
        let player3action = this.state.player3action;
        let player4action = this.state.player4action;
        let player1extra = actiondeck.slice(0,1);
        let player2extra = actiondeck.slice(1,2);
        let player3extra = actiondeck.slice(2,3);
        let player4extra = actiondeck.slice(3,4);
        actiondeck.splice(0,4)
        player1action = [...player1action, ...player1extra];
        player2action = [...player2action, ...player2extra];
        player3action = [...player3action, ...player3extra];
        player4action = [...player4action, ...player4extra];
        this.setState({
            player1action: player1action,
            player2action: player2action,
            player3action: player3action,
            player4action: player4action,
            actiondeck: actiondeck
        });
    }
    foodDeal(fooddeck){
        let player1 = this.state.player1;
        let player2 = this.state.player2;
        let player3 = this.state.player3;
        let player4 = this.state.player4;
        console.log("player1 is");
        console.log(player1);
        let player1extra = fooddeck.slice(0,2);
        let player2extra = fooddeck.slice(2,4);
        let player3extra = fooddeck.slice(4,6);
        let player4extra = fooddeck.slice(6,8);
        console.log("player 1 extra is");
        console.log(player1extra);
        player1 = [...player1, ...player1extra];
        player2 = [...player2, ...player2extra];
        player3 = [...player3, ...player3extra];
        player4 = [...player4, ...player4extra];
        fooddeck.splice(0,8)
        this.setState({
            player1: player1,
            player2: player2,
            player3: player3,
            player4: player4,
            fooddeck: fooddeck
        })

    }
    setCurrentPlayer1(player1){
        this.setState({player1})
    }
    setCurrentPlayer2(player2){
        this.setState({player2})
    }
    setCurrentPlayer3(player3){
        this.setState({player3})
    }
    setCurrentPlayer4(player4){
        this.setState({player4})
    }
    //current player turn
    setCurrentPlayer1Turn(player1turn){
        this.setState({player1turn})
    }
    setCurrentPlayer2Turn(player2turn){
        this.setState({player2turn})
    }
    setCurrentPlayer3Turn(player3turn){
        this.setState({player3turn})
    }
    setCurrentPlayer4Turn(player4turn){
        this.setState({player4turn})
    }
    //set player food plate
    setPlayer1Plate(player1plate){
        this.setState({player1plate})
    }
    setPlayer2Plate(player2plate){
        this.setState({player2plate})
    }
    setPlayer3Plate(player3plate){
        this.setState({player3plate})
    }
    setPlayer4Plate(player4plate){
        this.setState({player4plate})
    }
    //toggle food and action. round
    setFoodRound(foodround){
        this.setState({foodround})
    }
    setActionRound(actionround){
        this.setState({actionround})
    }
    setPlayer1Action(player1action){
        this.setState({player1action})
    }
    setPlayer2Action(player2action){
        this.setState({player2action})
    }
    setPlayer3Action(player3action){
        this.setState({player3action})
    }
    setPlayer4Action(player4action){
        this.setState({player4action})
    }
    setPlayer1Hand(player1hand){
        this.setState({player1hand})
    }
    setPlayer2Hand(player2hand){
        this.setState({player2hand})
    }
    setPlayer3Hand(player3hand){
        this.setState({player3hand})
    }
    setPlayer4Hand(player4hand){
        this.setState({player4hand})
    }
    setInitialRound(initialround){
        this.setState({initialround})
    }
    setToDeal(toDeal){
        this.setState({toDeal})
    }

    // setCurrentPlayer1Plate(player1plate){
    //     this.setState({player1plate})
    // }
    render(){
        if (this.state.player1turn == true && this.state.foodround == true){
            return(
                <div>
                    <Play1
                    setCurrentPlayer1={(s)=>{this.setCurrentPlayer1(s)}}
                    player1={this.state.player1}
                    setCurrentPlayer1Turn={(s)=>{this.setCurrentPlayer1Turn(s)}}
                    setCurrentPlayer2Turn={(s)=>{this.setCurrentPlayer2Turn(s)}}
                    player1plate={this.state.player1plate}
                    setPlayer1Plate={(s)=>{this.setPlayer1Plate(s)}}
                     />
                </div>
           );
        } else if (this.state.player2turn == true && this.state.foodround == true){
            return(
                <div>
                    <Play2
                    setCurrentPlayer2={(s)=>{this.setCurrentPlayer2(s)}}
                    player2={this.state.player2}
                    setCurrentPlayer2Turn={(s)=>{this.setCurrentPlayer2Turn(s)}}
                    setCurrentPlayer3Turn={(s)=>{this.setCurrentPlayer3Turn(s)}}
                    player2plate={this.state.player2plate}
                    setPlayer2Plate={(s)=>{this.setPlayer2Plate(s)}}
                     />
                </div>
           );
        } else if (this.state.player3turn == true && this.state.foodround == true){
            return(
                <div>
                    <Play3
                    setCurrentPlayer3={(s)=>{this.setCurrentPlayer3(s)}}
                    player3={this.state.player3}
                    setCurrentPlayer3Turn={(s)=>{this.setCurrentPlayer3Turn(s)}}
                    setCurrentPlayer4Turn={(s)=>{this.setCurrentPlayer4Turn(s)}}
                    player3plate={this.state.player3plate}
                    setPlayer3Plate={(s)=>{this.setPlayer3Plate(s)}}
                    />
                </div>
           );
        } else if (this.state.player4turn == true && this.state.foodround == true){
            return(
                <div>
                    <Play4
                    setCurrentPlayer4={(s)=>{this.setCurrentPlayer4(s)}}
                    player4={this.state.player4}
                    setCurrentPlayer4Turn={(s)=>{this.setCurrentPlayer4Turn(s)}}
                    setFoodRound={(s)=>{this.setFoodRound(s)}}
                    player4plate={this.state.player4plate}
                    setPlayer4Plate={(s)=>{this.setPlayer4Plate(s)}}
                     />
                    }
                </div>
            );
        } else if (this.state.foodround == false && this.state.actionround == false){
            return(
                <div className={styles.container}>
                    <img src="https://webgradients.com/public/webgradients_png/021%20True%20Sunset.png" className={styles.background}/>
                    <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/action-153-549933.png" className={styles.icon} />
                    <div className={styles.instruction}>ACTION ROUND!
                    </div>
                 </div>
            );
            /////////////////////////////////////////
////////////ACTION TURN//////////////////////////////////
        } else if (this.state.actionround == true && this.state.player1turn == true ){
            console.log("player 1 has");
            console.log(this.state.player1hand);
            console.log(this.state.player1action);
            return(
                <div>
                    <Action1
                    player1action={this.state.player1action}
                    player1hand={this.state.player1hand}
                    setPlayer1Action={(s)=>{this.setPlayer1Action(s)}}
                    setPlayer1Hand={(s)=>{this.setPlayer1Hand(s)}}
                    setCurrentPlayer1Turn={(s)=>{this.setCurrentPlayer1Turn(s)}}
                    setCurrentPlayer2Turn={(s)=>{this.setCurrentPlayer2Turn(s)}}
                    />
                </div>
            );
        } else if (this.state.actionround == true && this.state.player2turn == true ){
            return(
                <div>
                    <Action2
                    player2action={this.state.player2action}
                    player2hand={this.state.player2hand}
                    setPlayer2Action={(s)=>{this.setPlayer2Action(s)}}
                    setPlayer2Hand={(s)=>{this.setPlayer2Hand(s)}}
                    setCurrentPlayer2Turn={(s)=>{this.setCurrentPlayer2Turn(s)}}
                    setCurrentPlayer3Turn={(s)=>{this.setCurrentPlayer3Turn(s)}}
                    />
                </div>
            );
        } else if (this.state.actionround == true && this.state.player3turn == true ){
            return(
                <div>
                    <Action3
                    player3action={this.state.player3action}
                    player3hand={this.state.player3hand}
                    setPlayer3Action={(s)=>{this.setPlayer3Action(s)}}
                    setPlayer3Hand={(s)=>{this.setPlayer3Hand(s)}}
                    setCurrentPlayer3Turn={(s)=>{this.setCurrentPlayer3Turn(s)}}
                    setCurrentPlayer4Turn={(s)=>{this.setCurrentPlayer4Turn(s)}}
                    />
                </div>
            );
        } else if (this.state.actionround == true && this.state.player4turn == true ){
            return(
                <div>
                    <Action4
                    player4action={this.state.player4action}
                    player4hand={this.state.player4hand}
                    setPlayer4Action={(s)=>{this.setPlayer4Action(s)}}
                    setPlayer4Hand={(s)=>{this.setPlayer4Hand(s)}}
                    setCurrentPlayer4Turn={(s)=>{this.setCurrentPlayer4Turn(s)}}
                    setInitialRound={(s)=>{this.setInitialRound(s)}}
                    setFoodRound={(s)=>{this.setFoodRound(s)}}
                    setActionRound={(s)=>{this.setActionRound(s)}}
                    setToDeal={(s)=>{this.setToDeal(s)}}
                    />
                </div>
            );
        } else if (this.state.foodround == true && this.state.player1turn == false){
             return(
                <div>
                    <div className={styles.container}>
                        <img src="https://webgradients.com/public/webgradients_png/021%20True%20Sunset.png" className={styles.background}/>
                        <img src="https://cdn1.iconfinder.com/data/icons/pictograms-glyphs-2/48/151-512.png" className={styles.eat} />
                        <div className={styles.instruction}>
                        ENJOY YOUR FOOD
                        </div>
                    </div>
                 </div>
             );
        } else if (this.state.fooddeck.length<9 || this.state.actiondeck.length<5){
            return(
                <div>
                    <div className={styles.container}>
                        <img src="https://webgradients.com/public/webgradients_png/021%20True%20Sunset.png" className={styles.background}/>
                        <img src="https://p1.hiclipart.com/preview/842/81/309/random-s-game-over-text-thumbnail.jpg" className={styles.icon} />
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <div className={styles.container}>
                        <img src="https://webgradients.com/public/webgradients_png/021%20True%20Sunset.png" className={styles.background}/>
                        <img src="https://cdn0.iconfinder.com/data/icons/human-mind-2/100/43-512.png" className={styles.icon} />
                        <div className={styles.instruction}>
                        PLEASE WAIT
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default (Game);