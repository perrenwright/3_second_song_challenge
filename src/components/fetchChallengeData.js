import React from 'react';
import { getChallengeUtil } from '../getChallengeUtil';
import PlayChallenge from './playChallenge.js';
import {useState,useEffect,useRef} from 'react';
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

export default function FetchData(props) {
  const [done, setDone] = useState(undefined);
  const [data, updateData] = useState(null);
  const isCancelled = useRef(false);

    useEffect(() => {
    if (!isCancelled.current) {
    setTimeout(() => setDone(true), 7000)
  }
  return () => {
      isCancelled.current = true;
    };
  }, []);
  // This piece of code prevents the interface from displaying until all the data is loaded.
  useEffect(() => {
    const getData = async () => {
      if (!isCancelled.current) {
      const json = await getChallengeUtil(props.challengeID)
      updateData(json);
      }
    }
    getData();
    return () => {
      isCancelled.current = true;
    };
    // I believe this line of code is preventing a memory leak, I actually am not sure, but if you
    // "get a no-op blah blah memory leak from useffect" error, then this did not work haha.
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
            <PlayChallenge data={data} challenge_id={props.challengeID}/>
         )}
    </div>
  );


}
