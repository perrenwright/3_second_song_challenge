// I used the howler library because it had more functionalty and documentation than the  standard
// HTML audio library function.
let lastAudio

function stopLastAudio() {
    if (!lastAudio) return
    lastAudio.stop()
  }

export default function playsong(url,count,sound,time,last=false)
{
  if (last)
  {
    stopLastAudio()
  }
  else if (count < 2)
  {
      stopLastAudio()
      sound.play();
      lastAudio = sound
      setTimeout(function()
        {
          console.log("Stopped Song!")
          sound.unload()
        }, time);

  }
  // This is how I limit the song to 3 seconds. It is in miliseconds right now.
}