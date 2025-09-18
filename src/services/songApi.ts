import type { Song } from "../components/types";

// API 응답 데이터 타입
interface APISongData {
  title?: string;
  song_name?: string;
  singer?: string;
  artist?: string;
  no?: string;
  id?: string;
}

// 노래 데이터 캐시
let cachedSongs: Song[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5분 캐시

// 캐시된 노래 데이터를 가져오는 함수
async function getCachedSongs(): Promise<Song[]> {
  const now = Date.now();

  // 캐시가 없거나 만료된 경우 새로 가져옴
  if (!cachedSongs || now - cacheTimestamp > CACHE_DURATION) {
    cachedSongs = await fetchSongsFromAPI();
    cacheTimestamp = now;
  }

  return cachedSongs;
}

// 검색 API 함수
export async function searchSongs(query: string): Promise<Song[]> {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase();

  // 성능 최적화: 검색어가 너무 짧으면 빈 결과 반환
  if (searchTerm.length < 1) {
    return [];
  }

  // 캐시된 노래 목록을 가져옴
  const allSongs = await getCachedSongs();

  // 숫자로 시작하는 검색어인지 확인 (노래번호 검색 우선)
  const isNumberSearch = /^\d/.test(searchTerm);

  // 가져온 데이터에서 필터링 (제목, 가수, 번호로 검색)
  const results = allSongs
    .filter((song) => {
      // 숫자 검색인 경우 번호를 우선 검색
      if (isNumberSearch) {
        return (
          song.no.toLowerCase().includes(searchTerm) ||
          song.title.toLowerCase().includes(searchTerm) ||
          song.singer.toLowerCase().includes(searchTerm)
        );
      }
      // 일반 검색인 경우 기존 로직
      return (
        song.title.toLowerCase().includes(searchTerm) ||
        song.singer.toLowerCase().includes(searchTerm) ||
        song.no.toLowerCase().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      // 숫자 검색인 경우 번호 매치를 최우선으로
      if (isNumberSearch) {
        // 번호 정확 매치를 최우선으로 정렬
        if (a.no.toLowerCase() === searchTerm) return -1;
        if (b.no.toLowerCase() === searchTerm) return 1;

        // 번호 시작 매치를 두 번째 우선으로 정렬
        if (a.no.toLowerCase().startsWith(searchTerm)) return -1;
        if (b.no.toLowerCase().startsWith(searchTerm)) return 1;
      } else {
        // 일반 검색인 경우 제목 정확 매치를 최우선으로
        if (a.title.toLowerCase() === searchTerm) return -1;
        if (b.title.toLowerCase() === searchTerm) return 1;
      }

      // 제목 정확 매치를 두 번째 우선으로 정렬
      if (a.title.toLowerCase() === searchTerm) return -1;
      if (b.title.toLowerCase() === searchTerm) return 1;

      // 가수 정확 매치를 세 번째 우선으로 정렬
      if (a.singer.toLowerCase() === searchTerm) return -1;
      if (b.singer.toLowerCase() === searchTerm) return 1;

      // 그 외는 원래 순서 유지
      return 0;
    })
    .slice(0, 100); // 결과 수 제한으로 성능 향상

  return results;
}

// 찜한 노래 목록 가져오기
export async function getLikedSongs(): Promise<Song[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const likedSongs = localStorage.getItem("liked-songs");
  return likedSongs ? JSON.parse(likedSongs) : [];
}

// 새로운 API 엔드포인트에서 노래 목록 가져오기
export async function fetchSongsFromAPI(): Promise<Song[]> {
  try {
    const response = await fetch(
      "https://api.manana.kr/karaoke/song/wonderful.json"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // API 응답 데이터를 Song 타입으로 변환
    return (data as APISongData[]).map((song) => ({
      title: song.title || song.song_name || "",
      singer: song.singer || song.artist || "",
      no: song.no || song.id || "",
    }));
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw new Error("노래 목록을 가져오는데 실패했습니다.");
  }
}
