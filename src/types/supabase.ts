export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      venues: {
        Row: {
          id: string
          name: string
          type: string
          address: string
          city: string
          postal_code: string
          country: string
          phone: string | null
          email: string | null
          website: string | null
          capacity: number | null
          lanes: number | null
          length: number | null
          width: number | null
          depth_min: number | null
          depth_max: number | null
          has_diving_boards: boolean
          has_timing_system: boolean
          is_indoor: boolean
          is_accessible: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string
          address: string
          city: string
          postal_code: string
          country: string
          phone?: string | null
          email?: string | null
          website?: string | null
          capacity?: number | null
          lanes?: number | null
          length?: number | null
          width?: number | null
          depth_min?: number | null
          depth_max?: number | null
          has_diving_boards?: boolean
          has_timing_system?: boolean
          is_indoor?: boolean
          is_accessible?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          address?: string
          city?: string
          postal_code?: string
          country?: string
          phone?: string | null
          email?: string | null
          website?: string | null
          capacity?: number | null
          lanes?: number | null
          length?: number | null
          width?: number | null
          depth_min?: number | null
          depth_max?: number | null
          has_diving_boards?: boolean
          has_timing_system?: boolean
          is_indoor?: boolean
          is_accessible?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}