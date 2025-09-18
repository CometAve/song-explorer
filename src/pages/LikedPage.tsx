import SongItem from "../components/SongItem";
import type { Song } from "../components/types";
import { useLikedStore } from "../store/likedStore";
import { useSongsFromAPI } from "../components/hooks/useSongsFromAPI";

function LikedPage() {
  const { likedSongs } = useLikedStore();
  const { data: apiSongs, isLoading } = useSongsFromAPI();

  if (isLoading) {
    return (
      <div className="LikedPage">
        <h1>좋아요한 노래</h1>
        <p>로딩 중...</p>
      </div>
    );
  }

  // 좋아요한 노래들을 API 데이터에서 필터링
  const likedSongsList = (apiSongs || []).filter((song: Song) =>
    likedSongs.has(song.no)
  );

  if (likedSongsList.length === 0) {
    return (
      <div className="LikedPage">
        <h1>좋아요한 노래</h1>
        <p>아직 좋아요한 노래가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="LikedPage">
      <h1>좋아요한 노래 ({likedSongsList.length}곡)</h1>
      <div className="SongList">
        {likedSongsList.map((song: Song) => (
          <SongItem {...song} key={song.no} />
        ))}
      </div>
    </div>
  );
}

export default LikedPage;
