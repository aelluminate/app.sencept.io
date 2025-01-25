import * as React from "react"

export function useDialog() {
  const [isOpen, setIsOpen] = React.useState(false)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  return { isOpen, openDialog, closeDialog }
}
