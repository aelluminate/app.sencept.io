import { z } from "zod"

export const FormSchema = z
  .object({
    datasetName: z.string().min(1, "Dataset name is required"),
    source: z.string().min(1, "Source is required"),
    file: z.instanceof(File).optional(),
    url: z.string().optional(),
    fileUrl: z.string().optional(),
    urlUrl: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.source === "file" && !data.file) {
        return false
      }
      if (data.source === "url" && !data.url) {
        return false
      }
      return true
    },
    {
      message: "File or URL is required based on the selected source",
      path: ["file"],
    },
  )

