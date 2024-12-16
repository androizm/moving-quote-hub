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
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          role: "customer" | "company"
          company_name: string | null
          business_license: string | null
          service_zip_codes: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: "customer" | "company"
          company_name?: string | null
          business_license?: string | null
          service_zip_codes?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: "customer" | "company"
          company_name?: string | null
          business_license?: string | null
          service_zip_codes?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      quote_requests: {
        Row: {
          id: string
          user_id: string
          from_address: string
          to_address: string
          move_date: string
          room_count: number
          special_items: string | null
          name: string
          email: string
          phone: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          from_address: string
          to_address: string
          move_date: string
          room_count: number
          special_items?: string | null
          name: string
          email: string
          phone: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          from_address?: string
          to_address?: string
          move_date?: string
          room_count?: number
          special_items?: string | null
          name?: string
          email?: string
          phone?: string
          status?: string
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
      user_role: "customer" | "company"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]