import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';
import createChallengeUtil from '../createChallengeUtil';
import { getLocalToken } from '../token';
import './about.css';
import './addChallenge.css'



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


  var token = getLocalToken();

  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  useEffect(() => {
    async function setValidPlaylistsFn() {
      let updatedValidPlaylists = [];
      let updatedValidPlaylists_img = [];

      await spotifyApi.getUserPlaylists().then(function (data) {
        console.log('User playlists', data['items']);
        console.log('spotifyApi.getUserPlaylists');
        for (var i in data['items']) {
          // console.log(data['items'][i]);
          var playlist_info = data['items'][i];
          updatedValidPlaylists_img[playlist_info['id']] = playlist_info['images'][0]['url']

          updatedValidPlaylists[playlist_info['id']] = playlist_info['name'];
          console.log(playlist_info['id'], playlist_info['name']);
        }
        // state does not actually update until the end of useEffect, you can't update
        setValidPlaylists(updatedValidPlaylists);
        setValidPlaylists_img(updatedValidPlaylists_img)
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
        <h2>Add Your Challenges</h2>
          <hr />
          {Object.keys(valid_playlists).map((key) => (
            <Button onClick={() => handleclick(key)}>
              <img className="photo" src={valid_playlists_img[key]} alt='img' />

              {valid_playlists[key]}
            </Button>
          ))}
        </div>

    </div>
  );
}
export default Challenges;