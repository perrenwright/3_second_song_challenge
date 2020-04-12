import React,{useState,useEffect} from 'react';
// import PlayChallenge from './ChallengePage';
import CardComponent from './card-component';
//import firebaseRef from 'firebase';
import firestoreRef from '../firebase';
export default function Challenges()
{

    console.log("calling function..")
    const [isFirebaseDone,setFirebaseDone] = useState(false);
    const [name,setName] = useState('noName');
    const [playlist,setPlaylsit] = useState([])
    const [image,setImage] = useState('noImage');
    const [creator,setCreator] = useState('noCreator');

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
        <div>
            <header>
                {console.log("rendering component...")}
                {playlist.map((row)=> (

                        <CardComponent key={row[0]}
                                       name={row[0]}
                                       image={row[1]}
                                       creator={row[2]}
                                       challengeID={row[3]}
                        />

                )
                )
}

            </header>
        </div>

    );
}