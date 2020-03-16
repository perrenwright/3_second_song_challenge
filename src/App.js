import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Button,withStyles} from '@material-ui/core';
import MenuAppBar from './components/appNav';
import globalleaderboard from './components/globalleaderboard';
import challenges from './components/challenges';
import about from './components/about';
import contactus from './components/contactus';
import authenticate from './authenticate';
import LoginButton from './components/LoginButton';
import SpotifyWebApi from 'spotify-web-api-js';
import getToken from './GetToken';
import getPlaylistInfo from './getPlaylistInfo';
import { Route, Switch} from 'react-router-dom';
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
    top: '240px',
    
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default function App() {
  const spotifyApi = new SpotifyWebApi();
  const token = getToken();
  getPlaylistInfo(token);
  return (
    <div className="App">
      <header className="App-header">
        <MenuAppBar /> 
      </header>
      <Switch>
        <Route path='/globalleaderboard' component={globalleaderboard} />
        <Route path='/challenges' component={challenges} />
        <Route path='./about' component={about} />
        <Route path='./contactus' component={contactus} />
      </Switch>
      <div className="App">
      <header className="App-header">
        <div>
          <img className="App-3SecondLogo"src="https://lh3.googleusercontent.com/-RDigpJXnuR0/Xl6uQ5qxvnI/AAAAAAAAAE8/wJJ349F9mcwMhrl4qlooXW2iBwo61v3TwCK8BGAsYHg/s0/2020-03-03.png" alt="3 Second Logo"/>
        </div>
        <div>
          <img className="App-musicLogo" src='https://lh3.googleusercontent.com/-CjiJG_t9Yhs/Xl6uR6LH7_I/AAAAAAAAAFA/bWVc5Bhb7wUdLXa2zr70HrpI_ccqeB6xwCK8BGAsYHg/s0/2020-03-03.png' alt="logo" />
        </div>
        <div style={{display:'inline-block'}}>
          <h1 className="App-titleText">3 SECOND CHALLENGE</h1>
        </div>
        <div className="App-headerText">
        <h2>with new playlists and songs, have fun</h2>
        <h2>and test whether your really know your</h2>
        <h2>favorite songs
        </h2>
        </div>
        
        <StyledButton onClick={() => authenticate()}>Get Started</StyledButton>
      </header>
      <div className="App-lowerSection">
        <div className="App-innerRectangle">
          <div className='App-column'>
            <h3 style={{color:"#19869E"}}>Play Challenges</h3>
            <p style={{color:"#19869E"}}>From your Beyoncé to Frank Sinatra,
              from K-Pop to Rock and Roll, test your song
              guess abilities with many Spotify playlists
            </p>
          </div>
          <div className='App-column'>
            <h3 style={{color:"#19869E"}}>Create Challenges</h3>
            <p style={{color:"#19869E"}}>Got a playlist you want to share?
              Upload your Spotify playlist and have your
              favorite songs guessed by people around the world
            </p>
          </div>
          <div className='App-column'>
          <h3 style={{color:"#19869E"}}>Play With Friends</h3>
          <p style={{color:"#19869E"}}>
          Test your skills against friends and see who really
          knows your favorite genre/artist
          </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
