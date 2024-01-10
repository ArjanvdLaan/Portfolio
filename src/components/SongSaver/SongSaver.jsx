import { useState, useEffect } from "react";
import "../SongSaver/CSS/SongSaver.css";

function SongSaver({
  onSongAdd,
  onSortArtist,
  onSortRating,
  originalSongs,
  setFilteredSongs,
  deletedSongs,
}) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [addGenre, setAddGenre] = useState("");
  const [addRating, setAddRating] = useState("");

  useEffect(() => {
    if (filterRating !== "") {
      setFilteredSongs(
        originalSongs.filter(
          (song) =>
            !deletedSongs.includes(song.title) &&
            Number(song.rating) === Number(filterRating)
        )
      );
    } else {
      setFilteredSongs([...originalSongs]);
    }
  }, [filterRating, originalSongs, setFilteredSongs, deletedSongs]);

  useEffect(() => {
    if (filterGenre !== "") {
      setFilteredSongs(
        originalSongs.filter(
          (song) =>
            !deletedSongs.includes(song.title) && song.genre === filterGenre
        )
      );
    } else {
      setFilteredSongs([...originalSongs]);
    }
  }, [filterGenre, originalSongs, setFilteredSongs, deletedSongs]);

  const filterByRating = (rating) => setFilterRating(rating);
  const filterByGenre = (genre) => setFilterGenre(genre);

  const onSubmit = () => {
    if (title.length > 0 && artist.length > 0) {
      console.log(`Submitting ${title}, ${artist}, ${addGenre}, ${addRating}`);
      onSongAdd(title, artist, addGenre, addRating);
      setTitle("");
      setArtist("");
      setAddGenre("");
      setAddRating("");
    }
  };
  const onShowAll = () => {
    // show all songs that are not deleted
    setFilteredSongs(
      originalSongs.filter((song) => !deletedSongs.includes(song.title))
    );
  };

  return (
    <div className="songsaver">
      <div className="newSong">
      <div className="input">
        <input
          className="input-width"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          placeholder="title"
        />
      </div>
      <div className="input">
        <input
          className="input-width"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          id="artist"
          name="artist"
          placeholder="artist"
        />
      </div>
      <div className="input">
        <select
          className="input-width genre"
          id="genre"
          name="genre"
          value={addGenre}
          onChange={(e) => setAddGenre(e.target.value)}
        >
          <option disabled value="">
            genre
          </option>
          <option value="rock">rock</option>
          <option value="pop">pop</option>
          <option value="jazz">jazz</option>
        </select>
      </div>
      <div className="input">
        <select
          className="input-width rating"
          id="rating"
          name="rating"
          value={addRating}
          onChange={(e) => setAddRating(e.target.value)}
        >
          <option value="">rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <button className="button" onClick={onSubmit} placeholder="Add song">
        Add
      </button>
      </div>
      <div className="side-options">
        <button className="btn" onClick={onSortArtist}>
          Sort artist A-Z
        </button>
        <button className="btn" onClick={onSortRating}>
          Sort rating 5-1
        </button>
        <select
          className="btn"
          value=""
          onChange={(e) => filterByGenre(e.target.value)}
        >
          <option value="" disabled>
            Filter by genre
          </option>
          <option value="rock">rock</option>
          <option value="pop">pop</option>
          <option value="jazz">jazz</option>
        </select>
        <select
          className="btn"
          value=""
          onChange={(e) => filterByRating(e.target.value)}
        >
          <option value="" disabled>
            Filter by rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <button
          className="buttonRefresh"
          onClick={onShowAll}
          placeholder="Show all songs"
        >
          All Songs
        </button>
      </div>
    </div>
  );
}

export default SongSaver;
