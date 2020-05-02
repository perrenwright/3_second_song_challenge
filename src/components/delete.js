import React,{useState, useEffect} from 'react';
import {Button,Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from 'firebase';
import { getLocalToken } from '../token';
import SpotifyWebApi from 'spotify-web-api-js';
import './about.css';
import './challenges.css';
import './addChallenge.css'

function Delete()
{
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    console.log("calling function..")
    async function getUsername(){
    var token = getLocalToken();
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    const username = await spotifyApi.getMe()
    console.log(username["id"])
    return username["display_name"]
  }

    const [playlist, setPlaylist] = useState([])
    const [message,setMessage] = useState('');
    const [open, setOpen] = useState(false);


    async function getPlaylists() {
        var username = await getUsername()
        let newPlaylist = [];
         let querySnapshot =  await firebase.firestore()
          .collection('challenge_test')
          .get();
          querySnapshot.forEach(function(doc) {
              if (doc.data().challenge_creator === username){
                  newPlaylist.push([doc.data().challenge_name,doc.data().challenge_image,doc.data().challenge_creator,doc.id]);
                }
          });
          setPlaylist(newPlaylist);
          console.log('Getting playlists finished');
      }
      useEffect(() => {
        getPlaylists()
        // eslint-disable-next-line
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
        handleOpen()
        getPlaylists()
    }
    function handleOpen() {
        setOpen(true);
        setMessage(' Deleted!');
    }
    function handleClose(event, reason){
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return(
    <div className="class1">
        <div className="about-titleText2">
            <h2>Delete Your Challenges</h2>
            <hr/>
                {console.log("rendering component...")}
                
                {Object.keys(playlist).map((key) => (
                    <div style={{display: 'inline-block'}} className="content">
                        <Button onClick={()=>  deleteChallenge(playlist[key][0], playlist[key][2]) }>
                        <img className="addChallenge-image" src={playlist[key][1]} alt='img' />
                        </Button>
                        <h6>{playlist[key][0]}</h6>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity='success'>
                            {message}
                            </Alert>
                        </Snackbar>
                   </div>
          ))}
          
        </div>
        </div>

    );
}
export default Delete;
