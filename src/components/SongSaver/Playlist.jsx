import React from "react";
import Song from "./Song";

function Playlist({
  originalSongs,
  filteredSongs,
  setFilteredSongData,
  setOriginalSongData,
  deletedSongs,
  setDeletedSongs
}) {
  function deleteSong(event, title) {
    const updatedOriginalSongs = originalSongs.filter(
      (song) => song.title !== title
    );
    setOriginalSongData(updatedOriginalSongs);
    setFilteredSongData((prevSongs) =>
      prevSongs.filter((song) => song.title !== title)
    );
    setDeletedSongs((prevDeletedSongs) => [...prevDeletedSongs, title]);
  }

  return (
    <table style={{ width: "100%" }}>
      {filteredSongs.map(
        (song) =>
          !deletedSongs.includes(song.title) && (
            <Song key={song.id} song={song} deleteSong={deleteSong} />
          )
      )}
    </table>
  );
}

export default Playlist;
