interface TableWrapperProps {
  children: React.ReactNode
}

export function DataTableWrapper({ children }: TableWrapperProps) {
  return (
    <div className="relative rounded-md border">
      <div className="overflow-auto">{children}</div>
    </div>
  )
}
