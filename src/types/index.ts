// ═══════════════════════════════════════════
// Global Type Definitions — Cognispace Platform
// ═══════════════════════════════════════════

export type Plan = 'free' | 'starter' | 'pro' | 'enterprise';
export type UserRole = 'admin' | 'developer' | 'viewer';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
export type ModelCategory = 'nlp' | 'vision' | 'audio' | 'multimodal' | 'embedding';

export interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    requestId: string;
  };
}
