import React from 'react';
import styles from './style.scss';

class Play1 extends React.Component {

    componentDidMount(){
    }
    componentDidUpdate(){
    }
    removeCard(e){
        let plateArray = this.props.player1plate;
        let index = plateArray.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = plateArray[index];
        plateArray.splice(index, 1);
        this.props.setPlayer1Plate(plateArray);
        let player1 = this.props.player1;
        player1.push(selectedCard);
        this.props.setCurrentPlayer1(player1);
    }
    readDetails(e){

        let array = this.props.player1;
        // let newArray = array.filter(card => card.id !== parseInt(e.currentTarget.id));

        let index = array.findIndex(card => card.id === parseInt(e.currentTarget.id));
        let selectedCard = array[index];
        array.splice(index, 1);
        this.props.setCurrentPlayer1(array);

        let player1plate = this.props.player1plate;
        player1plate.push(selectedCard);
        this.props.setPlayer1Plate(player1plate);
    }

    changeTurn(e){
        this.props.setCurrentPlayer1Turn(false);
        this.props.setCurrentPlayer2Turn(true);
    }

    render(){
        let output="";
        let plateOutput="";
        if(this.props.player1.length>0 && this.props.player1plate.length == 0){
            output = this.props.player1.map(item=>{
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
        } else if (this.props.player1.length>0 && this.props.player1plate.length>0){
            plateOutput = this.props.player1plate.map(plate=>{
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
            output = this.props.player1.map(item=>{
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
        } else if (this.props.player1plate.length>0 && this.props.player1.length == 0){
            plateOutput = this.props.player1plate.map(plate=>{
                return(
                    <div id={plate.id} className={"card "+styles.card} onClick={(e)=>{this.removeCard(e)}}>
                        <img src={plate.img} className={"card-img-top "+styles.imgcard} />
                        <div className="card-body text-wrap">
                            <h5 className="card-title">{plate.name}</h5>
                            <p className="card-text">{plate.description}</p>
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

export default (Play1);