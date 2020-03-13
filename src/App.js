import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import authenticate from './authenticate.js';
import LoginButton from './LoginButton.js';
import SpotifyWebApi from 'spotify-web-api-js';
import getToken from './GetToken.js'
import getPlaylistInfo from './getPlaylistInfo.js'

export default function App() {
  const spotifyApi = new SpotifyWebApi();
  const token = getToken();
  getPlaylistInfo(token)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Testing that we're here</h1>
        <LoginButton />
      </header>
    </div>
  );
}
