import SearchBar from "../components/SearchBar";
import SongList from "../components/SongList";
import { useSongsFromAPI } from "../components/hooks/useSongsFromAPI";

function SearchPage() {
  const { data: apiSongs, isLoading, isError, error } = useSongsFromAPI();

  return (
    <div className="SearchPage">
      <SearchBar />
      {isLoading && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          API에서 노래 목록을 불러오는 중...
        </div>
      )}
      {isError && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#e74c3c" }}>
          오류 발생: {error?.message}
        </div>
      )}
      {apiSongs && <SongList apiSongs={apiSongs} />}
    </div>
  );
}

export default SearchPage;
