import React from 'react';
import styles from './style.scss';

class Action4 extends React.Component {
    removeCard(e){
        let handArray = this.props.player4hand;
        let index = handArray.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = handArray[index];
        handArray.splice(index, 1);
        this.props.setPlayer4Hand(handArray);
        let player4action = this.props.player4action;
        player4action.push(selectedCard);
        this.props.setPlayer4Action(player4action);
    }
    readDetails(e){
        let array = this.props.player4action;
        // let newArray = array.filter(card => card.id !== parseInt(e.currentTarget.id));
        let index = array.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = array[index];
        array.splice(index, 1);
        this.props.setPlayer4Action(array);
        console.log(selectedCard, array);
        let player4hand = this.props.player4hand;
        player4hand.push(selectedCard);
        this.props.setPlayer4Hand(player4hand);
    }
    changeTurn(e){
        this.props.setCurrentPlayer4Turn(false);
        this.props.setFoodRound(true);
        this.props.setActionRound(false);
        this.props.setInitialRound(false);
        this.props.setToDeal(true);
    }
    render(){
        let output = "";
        let handOutput = "";
        if(this.props.player4action.length>0 && this.props.player4hand.length == 0){
            output = this.props.player4action.map(item=>{
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
        } else if (this.props.player4action.length>0 && this.props.player4hand.length>0){
            handOutput = this.props.player4hand.map(hand=>{
                return(
                    <div id={hand.id} className={"card "+styles.card}  onClick={(e)=>{this.removeCard(e)}}>
                        <img src={hand.img} className={"card-img-top "+styles.imgcard} />
                        <div className="card-body">
                            <h5 className="card-title">{hand.name}</h5>
                            <p className="card-text text-wrap">{hand.description}</p>
                        </div>
                    </div>
                );
            });
            output = this.props.player4action.map(item=>{
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
        } else if (this.props.player4hand.length>0 && this.props.player4action.length == 0){
            handOutput = this.props.player4hand.map(hand=>{
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

export default (Action4);