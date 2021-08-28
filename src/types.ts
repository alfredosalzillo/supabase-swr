import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

export type Count = 'exact' | 'planned' | 'estimated';

export type Filter<Data> = (
  query: PostgrestFilterBuilder<Data>,
) => PostgrestFilterBuilder<Data>;

export type PostgrestError = {
  message: string
  details: string
  hint: string
  code: string
};

export type PostgrestSuccessResponse<Data> = {
  status?: number
  statusText?: string
  data: Data[],
  count: number | null
};

export type PostgrestSingleSuccessResponse<Data> = {
  status?: number
  statusText?: string
  data: Data,
  count: number | null
};
export type Returning = 'minimal' | 'representation';
