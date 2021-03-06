import React from 'react';
import styles from './style.scss';

class Action2 extends React.Component {
    removeCard(e){
        let handArray = this.props.player2hand;
        let index = handArray.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = handArray[index];
        handArray.splice(index, 1);
        this.props.setPlayer2Hand(handArray);
        let player2action = this.props.player2action;
        player2action.push(selectedCard);
        this.props.setPlayer2Action(player2action);
    }
    readDetails(e){
        let array = this.props.player2action;
        // let newArray = array.filter(card => card.id !== parseInt(e.currentTarget.id));
        let index = array.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = array[index];
        array.splice(index, 1);
        this.props.setPlayer2Action(array);
        console.log(selectedCard, array);
        let player2hand = this.props.player2hand;
        player2hand.push(selectedCard);
        this.props.setPlayer2Hand(player2hand);
    }
    changeTurn(e){
        this.props.setCurrentPlayer2Turn(false);
        this.props.setCurrentPlayer3Turn(true);
    }
    render(){
        let output = "";
        let handOutput = "";
        if(this.props.player2action.length>0 && this.props.player2hand.length == 0){
            output = this.props.player2action.map(item=>{
                return(
                    <div id={item.id} className={"card "+styles.card} deet={item.name} onClick={(e)=>{this.readDetails(e)}}>
                        <img src={item.img} className={"card-img-top "+styles.imgcard} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text text-wrap">{item.description}</p>
                        </div>
                    </div>
                );
            });
        } else if (this.props.player2action.length>0 && this.props.player2hand.length>0){
            handOutput = this.props.player2hand.map(hand=>{
                return(
                    <div id={hand.id} className={"card "+styles.card} onClick={(e)=>{this.removeCard(e)}}>
                        <img src={hand.img} className={"card-img-top "+styles.imgcard} />
                        <div className="card-body">
                            <h5 className="card-title">{hand.name}</h5>
                            <p className="card-text text-wrap">{hand.description}</p>
                        </div>
                    </div>
                );
            });
            output = this.props.player2action.map(item=>{
                return(
                    <div id={item.id} className={"card "+styles.card} deet={item.name} onClick={(e)=>{this.readDetails(e)}}>
                        <img src={item.img} className={"card-img-top "+styles.imgcard} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text text-wrap">{item.description}</p>
                        </div>
                    </div>
                );
            });
        } else if (this.props.player2hand.length>0 && this.props.player2action.length == 0){
            handOutput = this.props.player2hand.map(hand=>{
                return(
                    <div id={hand.id} className={"card "+styles.card} onClick={(e)=>{this.removeCard(e)}}>
                        <img src={hand.img} className={"card-img-top "+styles.imgcard} />
                        <div className="card-body">
                            <h5 className="card-title">{hand.name}</h5>
                            <p className="card-text text-wrap">{hand.description}</p>
                        </div>
                    </div>
                );
            });
        }
        return(
            <div className={"container-fluid mx-0-auto pt-4 "+styles.table} style={{width: 414, height: 896}}>
                <div className="row">
                    <h1 className={styles.header}>CARDS IN HAND</h1>
                    <div className={styles.scroll}>
                            {output}
                    </div>
                </div>
                <div className="row mt-3">
                    <h1 className={styles.header}>CARDS IN PLATE</h1>
                    <div className={styles.scroll}>
                        {handOutput}
                    </div>
                </div>
                <nav className="footer navbar fixed-bottom navbar-light  bg-white mx-auto">
                    <button className="btn-outline-warning mx-auto" onClick={(e)=>{this.changeTurn(e)}}>DONE</button>
                </nav>
            </div>
        );
    }
}

export default (Action2);