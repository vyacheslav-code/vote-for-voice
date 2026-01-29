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
      phrases: {
        Row: {
          id: string
          text: string
          votes: number
          created_at: string
        }
        Insert: {
          id?: string
          text: string
          votes?: number
          created_at?: string
        }
        Update: {
          id?: string
          text?: string
          votes?: number
          created_at?: string
        }
      }
      vote_records: {
        Row: {
          id: string
          winner_id: string
          loser_id: string
          voted_at: string
        }
        Insert: {
          id?: string
          winner_id: string
          loser_id: string
          voted_at?: string
        }
        Update: {
          id?: string
          winner_id?: string
          loser_id?: string
          voted_at?: string
        }
      }
    }
  }
}
