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
  const [data, updateData] = useState(null);
  const [challenge_id, setChallenge_id] = useState(null);
  const isCancelled = useRef(false);

  // This piece of code prevents the interface from displaying until all the data is loaded.

  useEffect(() => {
    const getData = async () => {
      if (!isCancelled.current) {
      var json = await getChallengeUtil(props.challengeID)
      json["challenge_id"] = props.challengeID
      json["time"] = props.time
      json["challenge_length"] = props.challenge_length
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

  return (
    <div>
      {!data ? (
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

            <PlayChallenge data={data}/>
         )}
    </div>
  );


}
