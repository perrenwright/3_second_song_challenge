import React,{useState, useEffect} from 'react';
// import PlayChallenge from './ChallengePage';
import {Button} from '@material-ui/core';
import './firebase.js';
import firebase from 'firebase';
// import firebase, {database} from './firebase.js'
import firestoreRef from '../firebase';
import { getLocalToken } from '../token';
import SpotifyWebApi from 'spotify-web-api-js';
import './about.css';
import './challenges.css';



function Delete()
{
    console.log("calling function..")
    // eslint-disable-next-line
    const [playlist,setPlaylist] = useState([])
        async function getUsername(){
          var token = getLocalToken();
          var spotifyApi = new SpotifyWebApi();
          spotifyApi.setAccessToken(token);
          const username = await spotifyApi.getMe()
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
                if (doc.data().challenge_creator === username){
                    let temp_playlist = playlist;
                    playlist.push([doc.data().challenge_name,doc.data().challenge_image,doc.data().challenge_creator,doc.id]);
                    setPlaylist(temp_playlist);
                    console.log(playlist)
                  }
            });
            console.log('Getting playlists finished');
        }
        getPlaylists();
    },[playlist]);

    function deleteChallenge(playlist_name, username) {
        console.log(playlist_name)
        let db = firebase.firestore();
        let collectionRef = db.collection('challenge_test');
        collectionRef.where('challenge_name', '==', playlist_name).where('challenge_creator', '==', username)
        .get()
        .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete().then(() => {
            console.log("Document successfully deleted!");
            // TODO: This should cause react to re-render, but there is the same "two-click" bug that we have been facing
            for (var playlist_index = 0; playlist_index < playlist.length; playlist_index++) {
                if (playlist_name === playlist[playlist_index][0]) {
                    var temp_playlist = playlist;
                    temp_playlist.splice(playlist_index, 1);
                    break;
                }
            }
            setPlaylist(temp_playlist);
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
                {Object.keys(playlist).map((key) => (
                    <Button onClick={ ()=> deleteChallenge(playlist[key][0], playlist[key][2])}>
                    {playlist[key][0]}
                    </Button>
          ))}
            </header>
        </div>
        </div>

    );
}
export default Delete;