import React ,{useState , useEffect} from "react";
import { Howl } from "howler";
interface trackProps {
  src: string;
  title: string;
  artist: string;
  album: string;
  duration: string | number;
  imageUrl: string;
}

interface playlistProps {
  track: trackProps;
  isPlaying: boolean | undefined;
  setIsPlaying: (value: boolean) => void;
  selectedMusic: any;
  setSelectedMusic: (value: Howl) => void;
  isFirstTrack: boolean;
  setTrackDetail: ({tracktitle , trackArtist}:any) => void;
}

export default function Track({
  track,
  isPlaying,
  setIsPlaying,
  selectedMusic,
  setSelectedMusic,
  setTrackDetail,
  isFirstTrack,
}: playlistProps) {

    //state to pass the newMusic that is created by Howl
    const [music , setMusic] = useState<any>()

    //using holwer to set the music and hold it in Music state
    useEffect(() => {
      const newMusic = new Howl({
        src:[track.src],
        autoplay:false,
        loop:true,
      })
  
      //setting new music
      setMusic(newMusic)
  
      if(isFirstTrack)
      setSelectedMusic(newMusic)
  
    }, [track])

    
  //toggle to play and pause the music
  function handleToggle() {
    //sending title of music to global State
    setTrackDetail({tracktitle: track.title , trackArtist: track.artist})
    if(music.playing()){
      music.pause()
      setIsPlaying(false)   
      return;
    }  
    selectedMusic.playing() && selectedMusic.pause();
    setIsPlaying(true);
    music.play();
    setSelectedMusic(music)
  }
  

  return (
    <>
      <div className={ (selectedMusic === music && isPlaying ? "bg-gray-200" : "") + " grid grid-flow-col border-b-2 hover:bg-slate-100 justify-normal"}>
        <div className=" flex items-center space-x-1">
            <button
              onClick={handleToggle}
              className=  "bg-white rounded-full p-3 m-2 hover:cursor-pointer hover:shadow-md">
              {selectedMusic === music && isPlaying ?
              (<img src="pause-30.png" />) :
              (<img src="play-30.png" />) }  
            </button>
          <img
            src={track.imageUrl}
            alt={track.title + "artwork"}
            className="h-20 w-20"
          />
        </div>
        <div className="col-span-12 grid grid-flow-col items-center ">
          <div className="row-span-5 flex flex-row items-center justify-center">
            <span>{track.title}</span>
            <span className="px-1">-</span>
            <span>{track.artist}</span>
          </div>
        </div>
        <div className="flex m-auto justify-end">
          <p className="">{track.duration}</p>
        </div>
      </div>
    </>
  );
}
