export interface Identifiable {
  id: string
  name?: string
  filename?: string
  filepath?: string
  filesize?: number
  category?: string
  created_at?: string
  updated_at?: string
}

export type DataTableProps<T extends Identifiable> = {
  data: T[]
  options?: boolean
  arrangement?: Array<{ key: string; displayName: string; type?: string }> 
  isLoading?: boolean
  error?: string | null
}