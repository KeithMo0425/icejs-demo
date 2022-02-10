import { ColumnProps } from '@alifd/next/types/table';

// eslint-disable-next-line import/prefer-default-export
export function getColumnKey(column: ColumnProps & { key?: string }): string | null {
  if (column) {
    return column.key || String(column.title) || column.dataIndex || null;
  }
  return null;
}
