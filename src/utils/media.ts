// src/utils/media.ts
const MEDIA_BASE_URL = 'https://media.magocluster.com';

export function getMediaUrl(path: string | null | undefined): string {
  if (!path) return '';

  // 이미 외부 링크(http/https)인 경우 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 배포(npm run build) 환경일 때만 R2 도메인 연결
  if (import.meta.env.PROD) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${MEDIA_BASE_URL}${cleanPath}`;
  }

  // 로컬(npm run dev) 환경에서는 기존 경로(/images/...) 그대로 사용
  return path;
}