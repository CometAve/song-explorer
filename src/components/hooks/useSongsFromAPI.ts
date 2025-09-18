import { useQuery } from "@tanstack/react-query";
import { fetchSongsFromAPI } from "../../services/songApi";
import type { Song } from "../types";

export function useSongsFromAPI() {
  return useQuery<Song[], Error>({
    queryKey: ["songs", "api"],
    queryFn: fetchSongsFromAPI,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
    retry: 3, // 실패 시 3번 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프
  });
}
