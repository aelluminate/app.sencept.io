export interface Dataset {
    id: string
    name: string
    filename: string
    filepath: string
    filesize: number
    category: string
    created_at: string
    updated_at: string
}

export interface UpdateDatasetDialogProps {
  dataset: Dataset
  onUpdate: (updatedDataset: Dataset) => void
}