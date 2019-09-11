import React from 'react';
import styles from './style.scss';

class Action3 extends React.Component {
    removeCard(e){
        let handArray = this.props.player3hand;
        let index = handArray.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = handArray[index];
        handArray.splice(index, 1);
        this.props.setPlayer3Hand(handArray);
        let player3action = this.props.player3action;
        player3action.push(selectedCard);
        this.props.setPlayer3Action(player3action);
    }
    readDetails(e){
        let array = this.props.player3action;
        // let newArray = array.filter(card => card.id !== parseInt(e.currentTarget.id));
        let index = array.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = array[index];
        array.splice(index, 1);
        this.props.setPlayer3Action(array);
        console.log(selectedCard, array);
        let player3hand = this.props.player3hand;
        player3hand.push(selectedCard);
        this.props.setPlayer3Hand(player3hand);
    }
    changeTurn(e){
        this.props.setCurrentPlayer3Turn(false);
        this.props.setCurrentPlayer4Turn(true);
    }
    render(){
        let output = "";
        let handOutput = "";
        if(this.props.player3action.length>0 && this.props.player3hand.length == 0){
            output = this.props.player3action.map(item=>{
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
        } else if (this.props.player3action.length>0 && this.props.player3hand.length>0){
            handOutput = this.props.player3hand.map(hand=>{
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
            output = this.props.player3action.map(item=>{
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
        } else if (this.props.player3hand.length>0 && this.props.player3action.length == 0){
            handOutput = this.props.player3hand.map(hand=>{
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

export default (Action3);