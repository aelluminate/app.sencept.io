import { z } from "zod"

export const UpdateDatasetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  file: z.any().optional(), // For file uploads
})

export type UpdateDatasetValues = z.infer<typeof UpdateDatasetSchema>