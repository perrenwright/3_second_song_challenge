import React,{useState,useEffect} from 'react';
// import PlayChallenge from './ChallengePage';
import CardComponent from './card-component';
//import firebaseRef from 'firebase';
import firestoreRef from '../firebase';
import {GAME_STATE} from '../gamestate_enum.js';
import { useRef } from "react";
import './challenges.css'
import Song_timer from './song_timer.js'
import Challenge_length from './challenge_length.js'

export default function Challenges()
{

    console.log("calling function..")
    const [isFirebaseDone,setFirebaseDone] = useState(false);
    const [name,setName] = useState('noName');
    const [playlist,setPlaylsit] = useState([])
    const [image,setImage] = useState('noImage');
    const [creator,setCreator] = useState('noCreator');
    const [P_gameState, P_setGameState] = useState(null);
    const [gameTime, setgameTime] = useState(3000);
    const [challenge_length, setChallenge_length] = useState(3000);

    const P_wrapperSetGameState = val =>
    {
        P_setGameState(val);
    };
    const wrappersetgameTime = val =>
    {
       setgameTime(val);
    };
    const wrappersetChallenge_length = val =>
    {
       setChallenge_length(val);
    };

    useEffect(() => {
        /**
         * Function that pulls data from firebase
         * There may be a way to clean this up more when we get
         * more playlists to pull.
         */
        async function getPlaylists() {
           let querySnapshot =  await firestoreRef
            .collection('challenge_test')
            .get();
            querySnapshot.forEach(function(doc) {
                playlist.push([doc.data().challenge_name,doc.data().challenge_image,doc.data().challenge_creator,doc.id]);
                console.log(playlist)
            });

            console.log('Getting playlists finished');
            setFirebaseDone(true);
        }
        getPlaylists();

    },[]);

    return(
        <div id="class1">

            <header>
                {console.log("rendering component...")}
                <Challenge_length challenge_length={challenge_length} setChallenge_length={setChallenge_length} gameState={P_gameState}/>
                <Song_timer gameTime={gameTime} setgameTime={setgameTime} gameState={P_gameState}/>
                {playlist.map((row)=> {
                        if (row[3] != P_gameState && P_gameState != null)
                        {
                            return null;
                        }
                        else
                        {


                        return  <CardComponent key={row[0]}
                                       name={row[0]}
                                       image={row[1]}
                                       creator={row[2]}
                                       challengeID={row[3]}
                                       P_gameState={P_gameState}
                                       P_gameStateSetter={P_wrapperSetGameState}
                                       time = {gameTime}
                                       challenge_length = {challenge_length}

                        />

                        /* Since we are determining which card is clicked inside the cardComponent
                        I had to find away to hide the other components in the challanges.js file
                        This was achieved by passing the challenge_id back as P_gamestate and
                        using that to determine which component to render. We have a slight cosmetic issue
                        The images render on top of each other instead of side by side, someone may need
                        to fix that.
                        */

                }

               })
}

            </header>
        </div>

    );
}