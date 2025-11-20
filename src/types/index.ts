export interface Segment {
  text: string;
  color: string;
  gradient: [string, string];
}

export interface QueryParams {
  userId: string | null;
  mangoId: string | null;
}

export type ToastType = 'success' | 'error' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

