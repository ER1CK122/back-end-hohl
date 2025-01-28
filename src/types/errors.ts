export interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
} 