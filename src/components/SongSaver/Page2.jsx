import { useState } from "react";
import SongSaver from "./SongSaver";
import Playlist from "./Playlist";
import "../SongSaver/CSS/Page2.css";

function Page2() {
  const [originalSongData, setOriginalSongData] = useState([
    { 
      id: 1, 
      title: "Movement", 
      artist: "Hozier", 
      genre: "rock", 
      rating: 5 
    },
    {
      id: 2,
      title: "Bad Guy",
      artist: "Billie Eilish",
      genre: "pop",
      rating: 4,
    },
    {
      id: 3,
      title: "Lonely Boy",
      artist: "Black Keys",
      genre: "rock",
      rating: 5,
    },
  ]);

  const [filteredSongData, setFilteredSongData] = useState([
    ...originalSongData,
  ]);
  const [deletedSongs, setDeletedSongs] = useState([]);

  // console.log('filtered song data', filteredSongData)

  const addSong = (title, artist, genre, rating) => {
    setOriginalSongData((prevState) => [
      ...prevState,
      {
        id: originalSongData.length + 1,
        title: title,
        artist: artist,
        genre: genre,
        rating: rating,
      },
    ]);
  };

  const onSortArtist = () => {
    // console.log('Before Sort:', filteredSongData);
    const sortArtistSongData = [...filteredSongData].sort((a, b) => {
      return a.artist.toLowerCase() > b.artist.toLowerCase() ? 1 : -1;
    });
    // console.log(sortArtistSongData)
    setFilteredSongData(sortArtistSongData);
  };

  const onSortRating = () => {
    const sortRatingSongData = [...filteredSongData].sort(
      (a, b) => b.rating - a.rating
    );
    setFilteredSongData(sortRatingSongData);
  };

  return (
    <div className="songsaver-bg">
      <header>
        <div className="header">Ariesche Playlist</div>
      </header>
      <main>
        <SongSaver
          onSongAdd={addSong}
          onSortArtist={onSortArtist}
          onSortRating={onSortRating}
          originalSongs={originalSongData}
          setFilteredSongs={setFilteredSongData}
          deletedSongs={deletedSongs}
          setDeletedSongs={setDeletedSongs}
        />
        <table style={{ width: "100%" }}>
          <tbody className="tbody">
            <tr className="song-header">
              <th className="song-row-item">Title</th>
              <th className="song-row-item">Artist</th>
              <th className="song-row-item">Genre</th>
              <th className="song-row-item">Rating</th>
            </tr>
          </tbody>
        </table>
        <Playlist
          originalSongs={originalSongData}
          filteredSongs={filteredSongData}
          setFilteredSongData={setFilteredSongData}
          setOriginalSongData={setOriginalSongData}
          deletedSongs={deletedSongs}
          setDeletedSongs={setDeletedSongs}
        />
      </main>
    </div>
  );
}

export default Page2;
