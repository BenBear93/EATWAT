import React from 'react';
import styles from './style.scss';

class Play2 extends React.Component {

    componentDidMount(){
    }
    componentDidUpdate(){
    }
    removeCard(e){
        let plateArray = this.props.player2plate;
        let index = plateArray.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = plateArray[index];
        plateArray.splice(index, 1);
        this.props.setPlayer2Plate(plateArray);
        let player2 = this.props.player2;
        player2.push(selectedCard);
        this.props.setCurrentPlayer2(player2);
    }
    readDetails(e){

        let array = this.props.player2;
        // let newArray = array.filter(card => card.id !== parseInt(e.currentTarget.id));

        let index = array.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = array[index];
        array.splice(index, 1);
        this.props.setCurrentPlayer2(array);
        let player2plate = this.props.player2plate;
        player2plate.push(selectedCard);
        this.props.setPlayer2Plate(player2plate);
    }

    changeTurn(e){
        this.props.setCurrentPlayer2Turn(false);
        this.props.setCurrentPlayer3Turn(true);
    }

    render(){
        let output="";
        let plateOutput="";
        if(this.props.player2.length>0 && this.props.player2plate.length == 0){
            output = this.props.player2.map(item=>{
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
        } else if (this.props.player2.length>0 && this.props.player2plate.length>0){
            plateOutput = this.props.player2plate.map(plate=>{
                return(
                    <div id={plate.id} className={"card "+styles.card} onClick={(e)=>{this.removeCard(e)}}>
                        <img src={plate.img} className={"card-img-top "+styles.imgcard} />
                        <div className="card-body">
                            <h5 className="card-title">{plate.name}</h5>
                            <p className="card-text text-wrap">{plate.description}</p>
                        </div>
                    </div>
                );
            });
            output = this.props.player2.map(item=>{
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
        } else if (this.props.player2plate.length>0 && this.props.player2.length == 0){
            plateOutput = this.props.player2plate.map(plate=>{
                return(
                    <div id={plate.id} className={"card "+styles.card} onClick={(e)=>{this.removeCard(e)}}>
                        <img src={plate.img} className={"card-img-top "+styles.imgcard} />
                        <div className="card-body">
                            <h5 className="card-title">{plate.name}</h5>
                            <p className="card-text text-wrap">{plate.description}</p>
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
                        {plateOutput}
                    </div>
                </div>
                <nav className="footer navbar fixed-bottom navbar-light  bg-white mx-auto">
                    <button className="btn-outline-warning mx-auto" onClick={(e)=>{this.changeTurn(e)}}>DONE</button>
                </nav>
            </div>
        );
    }
}

export default (Play2);