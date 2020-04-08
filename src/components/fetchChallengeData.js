import React from 'react';
import { getChallengeUtil } from '../getChallengeUtil';
import PlayChallenge from './playChallenge.js';
import {useState,useEffect} from 'react';

const FetchData = () => {
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 7000)
  }, []);
  // This piece of code prevents the interface from displaying until all the data is loaded.
  // In the future, we could turn this into a loading screen. For now, it just shows the white background.

  const [data, updateData] = useState();
  useEffect(() => {
    const getData = async () => {
      const json = await getChallengeUtil("6bnfXsKx2VA8Mx8kheMuhj")
      updateData(json);
    }
    getData();
  }, []);
  // This is where I get the playlist data I need to display in play challenge.
  // We might have to also pass the leaderboard data into here.

if (data){
  return !spinner && <PlayChallenge data={data} />
}
else
{
  return null
}
// I did not want to pass undefined data into the play challenge component, so this code handles that/

}
export default FetchData;
