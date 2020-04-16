import React,{useState,useEffect} from 'react';
// import PlayChallenge from './ChallengePage';
import CardComponent from './card-component';
//import firebaseRef from 'firebase';
import firestoreRef from '../firebase';
import './challenges.css'


export default function Challenges()
{

    console.log("calling function..")
    // eslint-disable-next-line
    const [playlist,setPlaylsit] = useState([])
    const [P_gameState, P_setGameState] = useState(null);


    const P_wrapperSetGameState = val =>
    {
        P_setGameState(val);
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
        }
        getPlaylists();

    },[playlist]);

    return(
        <div id="class1">
            <header>
                {console.log("rendering component...")}
                {playlist.map((row)=> {
                        if (row[3] !== P_gameState && P_gameState != null)
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