import "./index.css";
import { useState, useCallback } from "react";
import { useSearchStore } from "../../store/searchStore";
import { searchSongs } from "../../services/songApi";

function SearchBar() {
  const [input, setInput] = useState("");
  const { isSearching, setSearchText, setSearchResults, setIsSearching } =
    useSearchStore();

  // 검색 실행 함수
  const handleSearch = useCallback(async () => {
    if (!input.trim()) return;

    setIsSearching(true);
    setSearchText(input.trim());

    try {
      const results = await searchSongs(input.trim());
      setSearchResults(results);
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [input, setSearchText, setSearchResults, setIsSearching]);

  return (
    <div className="SearchBar">
      <div className="SearchBar__container">
        <div className="SearchBar__input-container">
          <div className="SearchBar__icon">🎤</div>
          <input
            type="text"
            className="SearchBar__input"
            placeholder="노래 제목, 가수명, 번호를 검색하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {isSearching && (
            <div className="SearchBar__loading">
              <div className="SearchBar__spinner"></div>
            </div>
          )}
        </div>
        <button
          className="SearchBar__button"
          onClick={handleSearch}
          disabled={!input.trim() || isSearching}
        >
          <span className="SearchBar__button-icon">🔍</span>
          <span className="SearchBar__button-text">검색</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
