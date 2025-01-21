export const sources = [
  {
    name: "api",
    label: "API",
    description: "Connect to an external API endpoint.",
    disabled: true,
    badge: "Not yet available",
  },
  {
    name: "database",
    label: "Database",
    description: "Connect to a database (e.g., SQL, NoSQL).",
    disabled: true,
    badge: "Not yet available",
  },
  {
    name: "cloudStorage", 
    label: "Cloud Storage", 
    description: "Connect to cloud storage services (e.g., AWS S3, Google Cloud Storage, Azure Blob Storage).",
    disabled: true, 
    badge: "Not yet available",
  },
  {
    name: "file",
    label: "Upload a file",
    description: "Import data from a local file.",
    disabled: false,
    fileTypes: [".csv", ".xlsx", ".json", ".xml", ".parquet"],
  },
]