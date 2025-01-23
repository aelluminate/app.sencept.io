export const toSlugFormat = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[^a-z0-9-]/g, "")
}