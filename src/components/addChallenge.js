import React, { useState, useEffect } from 'react';
import { Button,Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SpotifyWebApi from 'spotify-web-api-js';
import createChallengeUtil from '../createChallengeUtil';
import { getLocalToken } from '../token';
import './addChallenge.css';
import './challenges.css';
import firestoreRef from '../firebase';


function Challenges() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  // Uncomment the following async function to test getChallengeUtil function
  // async function test_print_challenge_json() {
  //   let challenge_json = await getChallengeUtil('1oKgdPSoIaAHrZzYDVClnS');
  //   console.log(
  //     'Challenge JSON returned from getChallengeUtil.js',
  //     challenge_json
  //   );
  // }
  // test_print_challenge_json();

  console.log('Challenge function called');
  const [valid_playlists, setValidPlaylists] = useState({});
  const [unused_playlists, setUnusedPlaylists] = useState([]);
  const [used_playlists, setUsedPlaylists] = useState([]);
  const [open, setOpen] = useState(false);
  const [message,setMessage] = useState('');
  var token = getLocalToken();

  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  useEffect(() => {
    async function setValidPlaylistsFn() {
  //     let updatedValidPlaylists = [];
  //     await spotifyApi.getUserPlaylists().then(function (data) {
  //       console.log('User playlists', data['items']);
  //       console.log('spotifyApi.getUserPlaylists');
  //       for (var i in data['items']) {
  //         // console.log(data['items'][i]);
  //         var playlist_info = data['items'][i];
  //         updatedValidPlaylists[playlist_info['id']] = [playlist_info['name'],playlist_info['images'][0].url];
  //         console.log(playlist_info['id'], playlist_info['name'],playlist_info['image']);
  //       }
  //       // state does not actually update until the end of useEffect, you can't update
  //       setValidPlaylists(updatedValidPlaylists);
  //     });
  //   }
  //   setValidPlaylistsFn();
  // },[] );

  let firestore_playlists = [];
  await firestoreRef
    .collection('challenge_test')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        firestore_playlists.push(doc.id);
      });
    });
    let updatedValidPlaylists = [];
    let temp_unused_playlists = [];
    let temp_used_playlists = [];
    await spotifyApi.getUserPlaylists().then(function (data) {
      for (var i in data['items']) {
        var playlist_info = data['items'][i];
        updatedValidPlaylists[playlist_info['id']] = [playlist_info['name'],playlist_info['images'][0].url];
        if (firestore_playlists.includes(playlist_info['id'])) {
          temp_used_playlists.push(playlist_info['id']);
        } else {
          temp_unused_playlists.push(playlist_info['id']);
        }
      console.log(playlist_info['id'], playlist_info['name']);
      }
      setValidPlaylists(updatedValidPlaylists);
      setUsedPlaylists(temp_used_playlists);
      setUnusedPlaylists(temp_unused_playlists);
    });
  }
  setValidPlaylistsFn();
  // eslint-disable-next-line
}, []);

  function handleClick(key) {
    console.log("Calledin create Challenge Util")
    setOpen(true);
    createChallengeUtil(key).then(message => {
      setMessage(message);
    })
    console.log('Playlist: ', valid_playlists[key][0])
    console.log("Message: ", message)
    return message;
  }
  
  function handleClose(event, reason){
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="class1">
    <div className="about-titleText2">
          <h2> Add Your Challenges</h2>
          <hr />
          {unused_playlists.map((key) => {
          return (
            <div style={{display: 'inline-block'}} className="content">
            <Button onClick={() => handleClick(key)}>
            <img className="addChallenge-image" src={valid_playlists[key][1]} alt={valid_playlists[key][0]}/>
            </Button>
            <h6>{valid_playlists[key][0]}</h6>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message === 'Success!' ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
            </div>
      );
      })}
       <h2>Challenges you have created</h2>
       <hr />
        {used_playlists.map((key) => {
          return (
            <div style={{display: 'inline-block'}} className="content">
            <Button>
            <img className="addChallenge-image" src={valid_playlists[key][1]} alt={valid_playlists[key][0]}/>
            </Button>

            <h6>{valid_playlists[key][0]}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}
  
export default Challenges;