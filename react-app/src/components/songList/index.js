import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSongs } from "../../store/songs";
import { SongListing } from "./SongListing";
import { load_Playlists } from "../../store/playlists";

export const SongsList = ({ songProp, playlistId }) => {
  const dispatch = useDispatch();
  const songsObj = useSelector((state) => state.songsReducer);
  let songs = Object.values(songsObj.songs);
  const { id } = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadSongs());
    dispatch(load_Playlists(id));
  }, [dispatch]);

  return (
    <>
      <div id="songslist">
        {(songProp ? songProp : songs).map((song) => {
          return (
            <SongListing
              key={song.id}
              song={song}
              playlistId={playlistId ? playlistId : null}
            />
          );
        })}
      </div>
    </>
  );
};
