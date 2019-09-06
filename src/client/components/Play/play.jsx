import React from 'react';
import styles from './style.scss';

class Play extends React.Component {
    componentDidMount(){
    }
    componentDidUpdate(){


    }

    render(){
        let output="";
        if(this.props.player1.length>0){
            output = this.props.player1.map(item=>{
                return(
                    <div>{item.name}</div>
                );
            });
        }
        return(
            <div>
                <p>IM IN PLAY</p>
                {output}
            </div>
        );
    }
}

export default (Play);