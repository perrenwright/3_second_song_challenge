import React,{useState, useEffect} from 'react';
// import PlayChallenge from './ChallengePage';
import {Button} from '@material-ui/core';
import CardComponent from './card-component';
import './firebase.js';
import firebase, { database } from 'firebase';
// import firebase, {database} from './firebase.js'
import firestoreRef from '../firebase';
import { getLocalToken } from '../token';
import SpotifyWebApi from 'spotify-web-api-js';
import {GAME_STATE} from '../gamestate_enum.js';
import { useRef } from "react";
import './about.css';
import './challenges.css';
import FlexView from 'react-flexview';



function Delete()
{
    console.log("calling function..")
    const [isFirebaseDone,setFirebaseDone] = useState(false);
    const [name,setName] = useState('noName');
    const [playlist,setPlaylsit] = useState([])
    // const [username, updateUsername] = useState(undefined);
    const [image,setImage] = useState('noImage');
    const [creator,setCreator] = useState('noCreator');
        async function getUsername(){
          var token = getLocalToken();
          var spotifyApi = new SpotifyWebApi();
          spotifyApi.setAccessToken(token);
          const username = await spotifyApi.getMe()
          // updateUsername(username["id"]);
          console.log(username["id"])
          return username["display_name"]
        }

    useEffect(() => {
        /**
         * Function that pulls data from firebase
         * There may be a way to clean this up more when we get
         * more playlists to pull.
         */
        async function getPlaylists() {
          var username = await getUsername()

           let querySnapshot =  await firestoreRef
            .collection('challenge_test')
            .get();
            querySnapshot.forEach(function(doc) {

                if (doc.data().challenge_creator == username){
                    playlist.push([doc.data().challenge_name,doc.data().challenge_image,doc.data().challenge_creator,doc.id]);
                    console.log(playlist)
                  }
            });

            console.log('Getting playlists finished');
            setFirebaseDone(true);
        }
        getPlaylists();

    },[]);

    async function deleteChallenge(playlist_name, username) {
        console.log(playlist_name)
        let db = firebase.firestore();
        let collectionRef = db.collection('challenge_test');
        collectionRef.where('challenge_name', '==', playlist_name).where('challenge_creator', '==', username)
        .get()
        .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete().then(() => {
            console.log("Document successfully deleted!");
            }).catch(function(error) {
            console.error("Error removing document: ", error);
            });
        });
        })
        .catch(function(error) {
        console.log("Error getting documents: ", error);
        });
        return alert('Document Deleted.')
    }

    return(
    //  <div className="about">
       <div className="class1">
        <div className="about-titleText">
            <h2>Delete Your Challenges</h2>
            <hr/>
            <header>
                {console.log("rendering component...")}
                {Object.keys(playlist).map((key) => (
                    <Button onClick={()=> deleteChallenge(playlist[key][0], playlist[key][2])}>            
                    {playlist[key][0]}
                    
                    </Button>
          ))}
            </header>
        </div>
        </div>
        
    );
}
export default Delete;