import React from 'react';
import { getChallengeUtil } from '../getChallengeUtil';
import PlayChallenge from './playChallenge.js';
import {useState,useEffect} from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as logoloading from "../11123-music.json"
import './fetchChallengeData.css'

const defaultOptions = {
loop: true,
autoplay: true,
animationData: logoloading.default,
rendererSettings: {
preserveAspectRatio: "xMidYMid slice"
}
}

export default function FetchData() {
  const [done, setDone] = useState(undefined);
  const [data, updateData] = useState(null);


    useEffect(() => {
    setTimeout(() => setDone(true), 7000)
  }, []);
  // This piece of code prevents the interface from displaying until all the data is loaded.
  useEffect(() => {
    const getData = async () => {
      const json = await getChallengeUtil("1YmciBrzRjf6HHT0IjEHYt")

      updateData(json);
    }
    getData();
  }, []);
  // This is where I get the playlist data I need to display in play challenge.
  // We might have to also pass the leaderboard data into here.

  return (
    <div>
      {!done ? (
        <FadeIn>
          <div align="center" >
            <Lottie options={defaultOptions} height={200} width={200} />
            <font color="black">
          <h1>Loading Game...</h1>
          </font>
          </div>
        </FadeIn>
        ) :
      (
            <PlayChallenge data={data} />
         )}
    </div>
  );


}
