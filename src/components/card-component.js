import React from 'react';
import {Button} from '@material-ui/core';
import './card-component.css';
import FetchData from './fetchChallengeData';
import {useState,useEffect} from 'react';
import {GAME_STATE} from '../gamestate_enum.js';



function CardComponent(props) {
    const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
    const [challenge_id,setChallenge_id] = useState(null);



    useEffect(() => {
        props.P_gameStateSetter(challenge_id);
    }, [challenge_id, props]);

    const onClick = () => {
        setChallenge_id(props.challengeID)
        setGameState(GAME_STATE.IN_PROGRESS)
    };


    // We need to pass the challange id to the parent component.
    // So that we can determine which component to display in the parent.
    // This is why I set the challange id and pass it back.

    return (
        <div>
            { gameState === GAME_STATE.BEFORE && props.name.includes(props.searchValue) &&
                <div className='card-component'>
                    <Button onClick={() => onClick()}>
                        <img
                            className="playlist-image"
                            src={props.image}
                            alt={props.name} />
                    </Button>
                    <h3 className='playlist-title'>{props.name}</h3>
                    <h4 className='playlist-creator-text'>Created by {props.creator}</h4>
                </div>
            }
         { gameState === GAME_STATE.IN_PROGRESS &&   <FetchData challengeID={props.challengeID}  time = {props.time} challenge_length={props.challenge_length} />}
        </div>

    )
}
export default CardComponent;