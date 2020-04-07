import SpotifyWebApi from 'spotify-web-api-js';
import React from 'react';
import {Howl, Howler} from 'howler';

// I used the howler library because it had more functionalty and documentation than the  standard
// HTML audio library function.
export default function playsong(url,count,sound)
{
  if (count == 0)
  {
    setTimeout(function()
    {
      sound.play();
      setTimeout(function()
        {
          sound.pause();
          sound.currentTime = 0;
        }, 3000);
    }, 1000);
  }
  // This is how I limit the song to 3 seconds. It is in miliseconds right now.
}