export interface Identifiable {
  id: string
}

export type DataTableProps<T extends Identifiable> = {
  data: T[]
  options?: boolean
  arrangement?: Array<{ key: string; displayName: string; type?: string }> 
  isLoading?: boolean
  error?: string | null
}