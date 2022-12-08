import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'vtsFileSize' })
export class VtsFileSizeConvert implements PipeTransform {
  transform(value: number | undefined, si = false, dp = 1): string {
    if (value === undefined) return '0B';

    const thresh = si ? 1000 : 1024;

    if (Math.abs(value) < thresh) {
      return value + ' B';
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      value /= thresh;
      ++u;
    } while (Math.round(Math.abs(value) * r) / r >= thresh && u < units.length - 1);

    return value.toFixed(dp) + ' ' + units[u];
  }
}
