import React ,{useState} from "react";
import Track from "./Components/Track";
import Player from "./Components/Player";

const MusicInstances = [
    {
      id: "t1",
      src: "/music/04. The Heaviest of Storms (Devotion, Pt. 1).mp3",
      title: "The Heaviest of Storms",
      artist: "Pale Honey",
      album: "Devotion",
      duration: "5:52",
      imageUrl: "/album-art.jpg",
    },
    {
      id: "t2",
      src: "/music/GeoPoet - Rabbit Rebellion.mp3",
      title: "Rabbit Rebellion",
      artist: "GeoPoet",
      album: "Album Name",
      duration: "8:32",
      imageUrl: "/album-art.jpg",
    },
    {
      id: "t3",
      src: "/music/Khruangbin - Maria También.mp3",
      title: "Maria Tambien",
      artist: "Khruangbin",
      album: "Album Name",
      duration: "3:10",
      imageUrl: "/album-art.jpg",
    },
    {
      id: "t6",
      src: "/music/1_4 - The Moment (Outro) - Bell Witch (128).mp3",
      title: "The Moment (Outro)",
      artist: "Bell Witch",
      album: "Album Name",
      duration: "3:06",
      imageUrl: "/album-art.jpg",
    },
    {
      id: "t8",
      src: "/music/Sufjan Stevens - To Be Alone With You.mp3",
      title: "To Be Alone With You",
      artist: "Sufjan Stevens",
      album: "Album Name",
      duration: "2:48",
      imageUrl: "/album-art.jpg",
    },
    {
      id: "t9",
      src: "/music/01 Song Seven.mp3",
      title: "Song Seven",
      artist: "Interpol",
      album: "Album Name",
      duration: "4:52",
      imageUrl: "/album-art.jpg",
    }, 
    
  ];

export default function MusicPage(){

  //global states
  const [isPlaying, setIsPlaying] = useState<boolean>(false); //whether the music is being played across the page
  const [selectedMusic, setSelectedMusic] = useState<any>(); //to hold music property that is created via Howl
  const [trackDetail , setTrackDetail] = useState<string>() //track information to be displayed among components

    return(
    <>
    <ul className="space-y-1 p-2 m-2 pb-32">
        {MusicInstances.map((track , index) =>(
            <li key={track.id}>
                <Track 
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                selectedMusic={selectedMusic}
                setSelectedMusic={setSelectedMusic}
                setTrackDetail={setTrackDetail}
                track={track}
                isFirstTrack={index === 0}                
                />
            </li>
        ))}
    </ul>
    <Player 
    isPlaying={isPlaying}
    setIsPlaying={setIsPlaying} //check and set whether music is being played
    selectedMusic={selectedMusic} //to have access to music property and apply necessary  changes
    trackDetail={trackDetail} //sending music title to be displayed in component
    />
    </>
    )
}











//to keep current time of music for managing progress bar and duration
  //this state can be held in Player
  // const [currentTime, setCurrentTime] = useState<number>();