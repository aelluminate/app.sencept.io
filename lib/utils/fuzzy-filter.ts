import { Identifiable } from "@/lib/types/data-table"

import {
    FilterFn,
    Row,
} from "@tanstack/react-table"
import { rankItem } from "@tanstack/match-sorter-utils"

export const fuzzyFilter: FilterFn<Identifiable> = (
  row: Row<Identifiable>,
  columnId: string,
  value: string,
) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  return itemRank.passed
}