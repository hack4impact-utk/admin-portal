export type TableOrder = 'asc' | 'desc';

export type HeadCell<TData> = {
  id: keyof TData;
  label: string;
  numeric: boolean;
  sortFn?: (a: TData, b: TData) => number;
};

export function sortTableFactory<TData>(headCells: HeadCell<TData>[]) {
  return <TData>(
    tableData: TData[],
    sortBy: keyof TData,
    order: TableOrder
  ) => {
    const orderByHeadCell = headCells.find(
      (headCell) => headCell.id === sortBy.toString()
    );

    if (!orderByHeadCell || !orderByHeadCell.sortFn) {
      return tableData;
    }

    return tableData.sort((a: TData, b: TData) =>
      order === 'asc'
        ? orderByHeadCell.sortFn!(a, b)
        : orderByHeadCell.sortFn!(b, a)
    );
  };
}

export function comparator(v1: string, v2: string) {
  if (v1 < v2) {
    return -1;
  }

  if (v1 > v2) {
    return 1;
  }

  return 0;
}
