import { CandyDate } from '@ui-vts/ng-vts/core/time';
import { isAllowedDate } from './util';

describe('util.ts coverage supplements', () => {
  it('should cover untouched branches', () => {
    const disabledDate = () => true;
    expect(isAllowedDate(new CandyDate(), disabledDate)).toBeFalsy();

    const disabledTime = () => {
      return {
        vtsDisabledHours: () => [1],
        vtsDisabledMinutes: () => [2],
        vtsDisabledSeconds: () => [3]
      };
    };
    expect(
      isAllowedDate(new CandyDate('2000-11-11 01:11:11'), undefined, disabledTime)
    ).toBeFalsy();
    expect(
      isAllowedDate(new CandyDate('2000-11-11 02:02:11'), undefined, disabledTime)
    ).toBeFalsy();
    expect(
      isAllowedDate(new CandyDate('2000-11-11 02:03:03'), undefined, disabledTime)
    ).toBeFalsy();
  });
});
