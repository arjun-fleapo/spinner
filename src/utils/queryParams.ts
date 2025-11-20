import { QueryParams } from '../types';

export function getQueryParams(): QueryParams {
  if (typeof window === 'undefined') {
    return { userId: null, mangoId: null };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    userId: params.get('userId') || null,
    mangoId: params.get('mangoId') || null,
  };
}

