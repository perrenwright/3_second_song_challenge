import React from 'react';
import {Button,withStyles} from '@material-ui/core';
import LandingPage from './components/landingPage';
// import logo from './logo.svg';
import './App.css';
import MenuAppBar from './components/appNav';
import globalleaderboard from './components/globalleaderboard';
import challenges from './components/challenges';
import about from './components/about';
import contact from './components/contact';
// import {Button,withStyles} from '@material-ui/core';
import './App.css';
import authenticate from './authenticate';
import LoginButton from './components/LoginButton';
import SpotifyWebApi from 'spotify-web-api-js';
import getToken from './GetToken';
import getPlaylistInfo from './getPlaylistInfo';
import { Route, Switch} from 'react-router-dom';



export default function App() {
  const spotifyApi = new SpotifyWebApi();
  const token = getToken();
  getPlaylistInfo(token);
  return (
    <div className="App">
      <header className="App-header">
        <MenuAppBar />
        <Switch>
          <Route path='/globalleaderboard' component={globalleaderboard} />
          <Route path='/challenges' component={challenges} />
          <Route path='/about' component={about} />
          <Route path='/contact' component={contact} />
        </Switch> 
      </header>
    </div>
    
  );
}
