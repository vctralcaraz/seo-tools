export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {               // the data expected from .select()
          id: number
          clientId: string
          url: string
          content: string
          links: string[]
        }
        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          clientId?: string
          url: string       // `not null` columns with no default must be supplied
          content: string
          links?: string[]
        }
        Update: {            // the data to be passed to .update()
          id?: never
          clientId?: string
          url?: string      // `not null` columns are optional on .update()
          content?: string
          links?: string[]
        }
      }
    }
  }
}
