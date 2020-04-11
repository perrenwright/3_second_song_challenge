import React from 'react';
import {Button,withStyles} from '@material-ui/core';
import authenticate from '../authenticate';
import { getChallengeUtil } from '../getChallengeUtil';
import PlayChallenge from './playChallenge.js';
import {useState,useEffect} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { getLocalToken } from '../token';

const StyledButton = withStyles({
  root: {
    background: '#19869E',
    borderRadius: 10,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(250, 250, 250, 250)',
    marginRight: '80%',
    top: '10px',

  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

function EndPage({score}) {
  // Send Score and Player to Database
  const [username, updateUsername] = useState("Anonymus");
  useEffect(() => {
    const getUsername = async () => {
      var token = getLocalToken();
      var spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      console.log("this is me", spotifyApi.getMe())
      const username = await spotifyApi.getMe()
      updateUsername(username["id"]);
      console.log(username["id"])
    }
    getUsername();
  }, []);
  return (
    <div className="LandingPage">
      <font color="black">
      <h1> {username} your score is {score} </h1>
      </font>
    </div>
  );
}

export default EndPage;

