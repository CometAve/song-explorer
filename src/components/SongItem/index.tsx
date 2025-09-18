import { memo } from "react";
import type { Song } from "../types";
import { useLikedStore } from "../../store/likedStore";
import "./index.css";

interface SongItemProps {
  title: Song["title"];
  singer: Song["singer"];
  no: Song["no"];
}

const SongItem = memo(function SongItem({ title, singer, no }: SongItemProps) {
  const isLiked = useLikedStore((state) => state.likedSongs.has(no));
  const toggleSong = useLikedStore((state) => state.toggleSong);

  return (
    <div className="Song">
      <div className="Song__container">
        <div className="Song__number">
          <span className="Song__number-text">{no}</span>
        </div>
        <div className="Song__content">
          <div className="Song__title-wrapper">
            <div className="Song__title">{title}</div>
            <div className="Song__singer">{singer}</div>
          </div>
          <div className="Song__actions">
            <div
              onClick={() => toggleSong(no)}
              className={`Song__like-button ${isLiked ? "liked" : ""}`}
            >
              <span className="Song__like-icon">{isLiked ? "❤️" : "🤍"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SongItem;
