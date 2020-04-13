import React from 'react';
import {Button,withStyles} from '@material-ui/core';
import LandingPage from './components/landingPage';
// import logo from './logo.svg';
import './App.css';
import MenuAppBar from './components/appNav';
import globalleaderboard from './components/globalleaderboard';
import challenges from './components/challenges';
import playchallenge from './components/playChallenge';
import about from './components/about';
import contact from './components/contact';
import authenticate from './authenticate';
import LoginButton from './components/LoginButton';
import SpotifyWebApi from 'spotify-web-api-js';
import getToken from './GetToken';
import getPlaylistInfo from './getPlaylistInfo';
import { Route, Switch } from 'react-router-dom';
import FetchData from './components/fetchChallengeData';
import addchallenge from './components/addChallenge';
import Delete from './components/delete';

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
    top: '240px'
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button);

export default function App() {
  const spotifyApi = new SpotifyWebApi();
  const token = getToken();
  getPlaylistInfo(token);
  return (
    <div className="App">
      <header className="App-header">
        <MenuAppBar />
        <Switch>
          <Route path="/globalleaderboard" component={globalleaderboard} />
          <Route path="/challenges" component={challenges} />
          <Route path="/about" component={about} />
          <Route path="/contact" component={contact} />
          <Route path="/addchallenge" component={addchallenge} />
          <Route path="/delete" component={Delete} />
        </Switch>
      </header>
    </div>

  );
}
