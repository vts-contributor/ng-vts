export function isDate(value: any): boolean {
  return toString.call(value) === '[object Date]';
}

export function isNumber(value: any): boolean {
  return typeof value === 'number';
}
