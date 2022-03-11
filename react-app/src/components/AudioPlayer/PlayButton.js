import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    playSong,
    toggle_play,
    loadSong,
    play,
    pause,
    addToQueue,
    addMultipleSongs,
  } from "../../store/songs";
import "./AudioPlayer.css"


export const PlayButton = ({ type, mediaId }) => {



    const dispatch = useDispatch();

const onClick = () => {
    dispatch(addMultipleSongs({type, id: mediaId}))
}


    return (
        <>
            <button className="global-play-button"
            onClick={onClick}>Play</button>
        </>
    )
}
