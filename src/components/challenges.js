import React, { useState, useEffect } from 'react';
import { Button, withStyles } from '@material-ui/core';
import GetToken from '../GetToken';
import authenticate from '../authenticate';
import SpotifyWebApi from 'spotify-web-api-js';

import './about.css';

const StyledButton = withStyles({
  root: {
    background: '#19869E',
    borderRadius: 10,
    border: 0,
    color: 'white',
    height: 48,
    width: 144,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(250, 250, 250, 250)',
    right: '575px'
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button);

export default function Challenges() {
  console.log('Challenge function called');
  const [valid_playlists, setValidPlaylists] = useState({});

  var token =
    'BQDO4WAEBgvnADE_gdzHL8BlF_lNGCjXwhiEvfD139m7cNnuGS37x6eEA6oQ9bPzR3XSYzlsIKufFNhk-NkgCzne5mb8v2bqgDOmDrCZwviqU5WA2HM73BMS67TvqX9_ssQdwPPkzYFCTIQ8fOkyOfIK-2Ub8EE';
  console.log('Token in challenges page: ', token);

  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  useEffect(() => {
    async function setValidPlaylistsFn() {
      await spotifyApi.getUserPlaylists().then(function(data) {
        console.log('User playlists', data['items']);
        for (var i in data['items']) {
          //   console.log(data['items'][i]);
          var playlist_info = data['items'][i];
          var id_to_name_state = valid_playlists;
          id_to_name_state[playlist_info['id']] = playlist_info['name'];
          setValidPlaylists(id_to_name_state);
          console.log(playlist_info['id'], playlist_info['name']);
        }
      });
    }

    setValidPlaylistsFn();
    console.log('setValidPlaylistsFn', valid_playlists);
  }, []);

  return (
    <div className="about">
      <div className="about-header">
        <div className="about-headerText">
          <h2> Dummy Challenge </h2>
          <h2> Dummy Challenge </h2>
          <h2> Dummy Challenge </h2>
          <h2> Dummy Challenge </h2>
          <h2> Dummy Challenge </h2>
          <hr />
          {Object.keys(valid_playlists).map((key, index) => (
            <p key={index}>
              <button type="button">{valid_playlists[key]} </button>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
