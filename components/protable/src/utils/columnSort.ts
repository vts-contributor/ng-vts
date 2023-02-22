export type ColumnsState = {
  show?: boolean;
  fixed?: 'right' | 'left' | undefined;
  order?: number;
  disable?:
  | boolean
  | {
    checkbox: boolean;
  };
};

export const columnSort = (columnsMap: Record<string, ColumnsState>) => (a: any, b: any) => {
  const { fixed: aFixed, index: aIndex } = a;
  const { fixed: bFixed, index: bIndex } = b;
  if ((aFixed === 'left' && bFixed !== 'left') || (bFixed === 'right' && aFixed !== 'right')) {
    return -2;
  }
  if ((bFixed === 'left' && aFixed !== 'left') || (aFixed === 'right' && bFixed !== 'right')) {
    return 2;
  }
  // If there is no index, it will report an error when dataIndex or key does not exist
  const aKey = a.key || `${aIndex}`;
  const bKey = b.key || `${bIndex}`;
  if (columnsMap[aKey]?.order || columnsMap[bKey]?.order) {
    return (columnsMap[aKey]?.order || 0) - (columnsMap[bKey]?.order || 0);
  }
  return (a.index || 0) - (b.index || 0);
};