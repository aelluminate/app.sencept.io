export interface Identifiable {
  id: string
}

export type DataTableProps<T extends Identifiable> = {
  data: T[]
}