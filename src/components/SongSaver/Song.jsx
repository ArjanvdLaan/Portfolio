import "../SongSaver/CSS/Song.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Song = ({song, deleteSong}) => {
  // console.log(song.title)
  return (
    <tbody>
      <tr className="playlist">
        <th className="playlist-item">{song.title}</th>
        <th className="playlist-item">{song.artist}</th>
        <th className="playlist-item">{song.genre}</th>
        <th className="playlist-item">{song.rating}</th>
        <th className="playlist-item">
          <FontAwesomeIcon
            icon={faTrash}
            onClick={(event) => deleteSong(event, song.title)}
            className="delBtn"
          />
        </th>
      </tr>
    </tbody>
  );
};

export default Song;
