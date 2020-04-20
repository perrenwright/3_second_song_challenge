import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';
import createChallengeUtil from '../createChallengeUtil';
import { getLocalToken } from '../token';
import firestoreRef from '../firebase';
import './about.css';
import './addChallenge.css';

function Challenges() {
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
  const [valid_playlists_img, setValidPlaylists_img] = useState({});
  const [unused_playlists, setUnusedPlaylists] = useState([]);
  const [used_playlists, setUsedPlaylists] = useState([]);

  var token = getLocalToken();

  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  useEffect(() => {
    async function setValidPlaylistsFn() {
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
      let updatedValidPlaylists_img = [];
      let temp_unused_playlists = [];
      let temp_used_playlists = [];
      await spotifyApi.getUserPlaylists().then(function (data) {
        console.log('User playlists', data['items']);
        console.log('spotifyApi.getUserPlaylists');
        for (var i in data['items']) {
          // console.log(data['items'][i]);
          var playlist_info = data['items'][i];
          updatedValidPlaylists_img[playlist_info['id']] =
            playlist_info['images'][0]['url'];
          updatedValidPlaylists[playlist_info['id']] = playlist_info['name'];
          if (firestore_playlists.includes(playlist_info['id'])) {
            temp_used_playlists.push(playlist_info['id']);
          } else {
            temp_unused_playlists.push(playlist_info['id']);
          }
          console.log(playlist_info['id'], playlist_info['name']);
        }
        // state does not actually update until the end of useEffect, you can't update
        setValidPlaylists(updatedValidPlaylists);
        setValidPlaylists_img(updatedValidPlaylists_img);
        setUsedPlaylists(temp_used_playlists);
        setUnusedPlaylists(temp_unused_playlists);
      });
    }
    setValidPlaylistsFn();
    // eslint-disable-next-line
  }, []);

  function handleclick(key) {
    return createChallengeUtil(key);
  }

  return (
    <div className="class1">
      <div className="about-titleText">
        <h2>Add new challenges</h2>
        <hr />
        {unused_playlists.map((unused_playlist) => {
          return (
            <Button onClick={() => handleclick(unused_playlist)}>
              <img
                className="photo"
                src={valid_playlists_img[unused_playlist]}
                alt="img"
              />
              {valid_playlists[unused_playlist]}
            </Button>
          );
        })}

        <br />
        <br />
        <br />

        <h2>Challenges you have created</h2>
        <hr />
        {used_playlists.map((used_playlist) => {
          return (
            <Button>
              <img
                className="photo"
                src={valid_playlists_img[used_playlist]}
                alt="img"
              />
              {valid_playlists[used_playlist]}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
export default Challenges;
