import SongItem from "../SongItem";
import type { Song } from "../types";
import { useSearchStore } from "../../store/searchStore";

interface SongListProps {
  apiSongs?: Song[];
}

function SongList({ apiSongs }: SongListProps) {
  const { searchText, searchResults, isSearching } = useSearchStore();

  // 검색하지 않은 초기 상태 - API 데이터 표시
  if (!searchText) {
    return (
      <div className="SongList">
        {apiSongs && apiSongs.length > 0 ? (
          <>
            {apiSongs.map((song: Song) => (
              <SongItem {...song} key={song.no} />
            ))}
          </>
        ) : (
          <div className="SongList__empty">
            <div className="SongList__empty-icon">🎵</div>
            <div className="SongList__empty-text">노래를 검색해주세요</div>
            <div className="SongList__empty-subtext">
              검색창에 노래 제목이나 가수명을 입력해보세요
            </div>
          </div>
        )}
      </div>
    );
  }

  // 로딩 상태
  if (isSearching) {
    return (
      <div className="SongList">
        <div className="SongList__loading">
          <div className="SongList__loading-spinner"></div>
          <div className="SongList__loading-text">검색 중...</div>
        </div>
      </div>
    );
  }

  // 검색했지만 결과가 없는 경우
  if (searchResults.length === 0 && searchText) {
    return (
      <div className="SongList">
        <div className="SongList__empty">
          <div className="SongList__empty-icon">🔍</div>
          <div className="SongList__empty-text">검색된 노래가 없습니다</div>
          <div className="SongList__empty-subtext">
            다른 키워드로 검색해보세요
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="SongList">
      {searchResults.map((song: Song) => (
        <SongItem {...song} key={song.no} />
      ))}
    </div>
  );
}

export default SongList;
