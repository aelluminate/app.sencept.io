export interface Dataset {
  category: string
  filename: string
  filepath: string
  filesize: number
  id: string
  name: string
  upload_date: string
}

export interface APIResponse {
  data: Dataset[]
  limit: number
  page: number
  total: number
}