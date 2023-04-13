import { VtsChartColorScaleType } from './types/scale-type.enum';
import { StringOrNumberOrDate } from './models/chart-data.model';
/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 */
export function getUniqueXDomainValues(results: any[]): any[] {
  const valueSet = new Set();
  for (const result of results) {
    for (const d of result.series) {
      valueSet.add(d.name);
    }
  }
  return Array.from(valueSet);
}

/**
 * Get the scaleType of enumerable of values.
 * @returns  'time', 'linear' or 'ordinal'
 */
export function getVtsChartColorScaleType(values: any[], checkDateType: boolean = true): VtsChartColorScaleType {
  if (checkDateType) {
    const allDates = values.every(value => value instanceof Date);
    if (allDates) {
      return VtsChartColorScaleType.Time;
    }
  }

  const allNumbers = values.every(value => typeof value === 'number');
  if (allNumbers) {
    return VtsChartColorScaleType.Linear;
  }

  return VtsChartColorScaleType.Ordinal;
}

export function getXDomainArray(
  values: Array<string | number | Date>,
  xScaleMin?: number,
  xScaleMax?: number
): { domain: any[]; xSet: any[]; scaleType: string } {
  const scaleType = getVtsChartColorScaleType(values);
  let xSet: StringOrNumberOrDate[] = [];
  let domain: StringOrNumberOrDate[] = [];

  if (scaleType === VtsChartColorScaleType.Linear) {
    values = values.map(v => Number(v));
  }

  let min: number = 0;
  let max: number = 0;
  if (scaleType === VtsChartColorScaleType.Time || scaleType === VtsChartColorScaleType.Linear) {
    const mappedValues = values.map(v => Number(v));
    min = xScaleMin ? xScaleMin : Math.min(...mappedValues);
    max = xScaleMax ? xScaleMax : Math.max(...mappedValues);
  }

  if (scaleType === VtsChartColorScaleType.Time) {
    domain = [new Date(min), new Date(max)];
    //@ts-ignore
    xSet = [...values].sort((a: Date, b: Date) => {
      const aDate = a.getTime();
      const bDate = b.getTime();
      if (aDate > bDate) return 1;
      if (bDate > aDate) return -1;
      return 0;
    });
  } else if (scaleType === VtsChartColorScaleType.Linear) {
    domain = [min, max];
    // Use compare function to sort numbers numerically
    //@ts-ignore
    xSet = [...values].sort((a: number, b: number) => a - b);
  } else {
    domain = values;
    xSet = values;
  }

  return { domain, xSet, scaleType };
}
