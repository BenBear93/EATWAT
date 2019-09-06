import React from 'react';
import styles from './style.scss';
import Game from '../game/game';

class Start extends React.Component {
    constructor() {
        super();
        this.state = {
            start: true,
            game: false
        };
      }
    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.state.start == false && this.state.game == false){

            setTimeout(() => this.startGame(), 5000);
        }
    }

    handleClick(){
        this.setState( { start: false });
    }

    startGame (){
        this.setState ( {game: true} );
    }

    readDetail(e){
        console.log("READING CARD", e.target.getAttribute('deet'))
    }

    render() {
        let detail = "joker";
        if (this.state.start == true){
            return(
             <div className={styles.container}>
                <img src="https://webgradients.com/public/webgradients_png/021%20True%20Sunset.png" className={styles.background}/>
                <div deet={detail} onClick={(e)=>{this.readDetail(e)}} className={styles.centered}>EAT WAT!</div>
                <img src="https://cdn4.iconfinder.com/data/icons/cooking-26/64/hot_pot-cook-stew-boiling-512.png" className={styles.icon} onClick={()=>{this.handleClick()}}/>
             </div>
             );
         } else if (this.state.start == false && this.state.game == false){

            return(
                 <div className={styles.container}>
                    <img src="https://webgradients.com/public/webgradients_png/021%20True%20Sunset.png" className={styles.background}/>
                    <img src="http://www.pngmart.com/files/8/White-Plate-Transparent-PNG.png" className={styles.plate} />
                    <div className={styles.instruction}>READY! PLATE UP!
                    </div>
                 </div>
            );
        }else if (this.state.game == true && this.state.start == false){
                return(
                    <Game />
                );
         }
    }

}

export default (Start);