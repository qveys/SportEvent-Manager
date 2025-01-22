import { supabase } from './supabaseClient';
import type { ApiError } from '@supabase/supabase-js';

export class ApiService {
  static async get<T>(endpoint: string, query?: object): Promise<T[]> {
    let request = supabase.from(endpoint).select('*');
    
    if (query) {
      request = Object.entries(query).reduce((req, [key, value]) => {
        return req.eq(key, value);
      }, request);
    }
    
    const { data, error } = await request;
    if (error) throw this.handleError(error);
    return data as T[];
  }

  static async getById<T>(endpoint: string, id: string): Promise<T> {
    const { data, error } = await supabase
      .from(endpoint)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw this.handleError(error);
    return data as T;
  }

  static async create<T>(endpoint: string, payload: Partial<T>): Promise<T> {
    const { data, error } = await supabase
      .from(endpoint)
      .insert([payload])
      .select()
      .single();
    
    if (error) throw this.handleError(error);
    return data as T;
  }

  static async update<T>(endpoint: string, id: string, payload: Partial<T>): Promise<T> {
    const { data, error } = await supabase
      .from(endpoint)
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw this.handleError(error);
    return data as T;
  }

  static async delete(endpoint: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(endpoint)
      .delete()
      .eq('id', id);
    
    if (error) throw this.handleError(error);
  }

  private static handleError(error: ApiError): Error {
    console.error('API Error:', error);
    return new Error(error.message);
  }
}