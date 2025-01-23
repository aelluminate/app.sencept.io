import { Input } from "@/components/shared/input/_index"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <Input
      placeholder="Search..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="max-w-xs"
    />
  )
}
