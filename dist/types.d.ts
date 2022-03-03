import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
export declare type Count = 'exact' | 'planned' | 'estimated';
export declare type Filter<Data> = (query: PostgrestFilterBuilder<Data>) => PostgrestFilterBuilder<Data>;
export declare type PostgrestError = {
    message: string;
    details: string;
    hint: string;
    code: string;
};
export declare type PostgrestSuccessResponse<Data> = {
    status?: number;
    statusText?: string;
    data: Data[];
    count: number | null;
};
export declare type PostgrestSingleSuccessResponse<Data> = {
    status?: number;
    statusText?: string;
    data: Data;
    count: number | null;
};
export declare type Returning = 'minimal' | 'representation';
