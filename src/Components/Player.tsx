import React, { useState , useEffect } from 'react'
import { Howler } from "howler";

interface PlayerProps{
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  selectedMusic: any;
  trackDetail: any;
}

export default function Player({
  isPlaying,
  selectedMusic,
  setIsPlaying,
  trackDetail,
}: PlayerProps){

  const [currentTime ,setCurrentTime] = useState<any>()

  console.log("current time type is: " ,typeof currentTime);
  
  
  function togglePlay() {
    if (!selectedMusic) return;

    if (isPlaying) {
      selectedMusic.pause();
      setIsPlaying(false);
    } else {
      selectedMusic.play();
      setIsPlaying(true);
    }
  }

   //Howler.volume is a global volume controller for all the howl in project
   function handleVolumeChange(e: any) {
    Howler.volume(parseInt(e.target.value, 10) / 100);
  }

    // it resets the range button to the beginning when the music is changed NOT the current but the actual Music
  // and commit the action if the music exist in state
  useEffect(() => {
    setCurrentTime(0);
    if (selectedMusic) selectedMusic.seek(0);
  }, [selectedMusic]);

  //this function get the value of input:range which is parsed value of currentTime
  function handleSeekChange(e: any) {
    let seekTime = 0;
    seekTime = parseInt(e.target.value, 10);
    // setCurrentTime is set to seekTime to control the value of input:range_seek
    setCurrentTime(seekTime);
    //the reason I have used seekTime instead of currentTime is that the currentime is an async state so the music should be pause and resume
    //to make the input:range_seek to work
    selectedMusic.seek(seekTime);
  }

   //this useEffect sets an Interval for each 1sec and update the value of the 
   useEffect(() => {
    let timerInterval: any;
    if(selectedMusic){ 
      const  updaterTimer = () => {
        const seekTimer = Math.round(selectedMusic.seek())
        setCurrentTime(seekTimer)
      };
      //The return value of setInterval is a unique identifier for the timer, 
      //which is stored in the timerInterval variable in this case.
      // This identifier can be used later with the clearInterval function to stop the recurring timer.
      timerInterval = setInterval(updaterTimer , 1000)
    }
    return () => {
      clearInterval(timerInterval)
    }
  }, [selectedMusic])

//takes the timeInSeconds Value and convertss it into the timer format
function formatTime(timeInSeconds:number) {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2 , '0')

  return `${formattedMinutes}:${formattedSeconds}`
}
const formattedTime = formatTime(currentTime)

console.log("formattedTime type is :" , typeof formattedTime);


  return (
    <>
    <div className=" z-50 grid-flow-row fixed bottom-0 w-screen bg-white shadow-md h-auto p-3">
        <div className="my-auto border-t-4 border-gray-400 pt-2 mr-7">
        <div className="flex justify-center items-center xl:justify-start">{trackDetail?.tracktitle ? `${trackDetail.tracktitle } - ${trackDetail.trackArtist}` : "Music Name"}</div>
        <div className="relative flex max-lg:justify-center space-x-3">
          <label htmlFor="durationController">Duration</label>
          <input
          className=" rounded-sm cursor-pointer"
            type="range"
            min="0"
            //testify where the selectedMusic contains data from music in PlaylistCard Component if so when set duration
            //otherwise the input range won't work
            max={selectedMusic ? selectedMusic.duration() : 0}
            //check out whether the current time contains value otherwise the value is 0 also it displays the music duration place
            value={currentTime || 0}
            onChange={handleSeekChange}
          />
          <div>{formattedTime}</div>
          <button onClick={togglePlay} className="bg-white rounded-full p-2 hover:bg-slate-200 hover:shadow-lg">
            <img src={isPlaying ? "pause-30.png" : "play-30.png"} />
          </button>
          <label htmlFor="volumeController">Volume</label>
          <input
          className="cursor-pointer"
            onChange={handleVolumeChange}
            name="volumeController"
            type="range"
            max="100"
            defaultValue="100"
          />
        </div>
        </div>
      </div>
    </>
  )
}

