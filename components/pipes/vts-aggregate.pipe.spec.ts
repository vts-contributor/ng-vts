import { VtsAggregatePipe } from './vts-aggregate.pipe';

describe('VtsAggregatePipe', () => {
  let vtsAggregatePipe: VtsAggregatePipe;

  beforeEach(() => {
    vtsAggregatePipe = new VtsAggregatePipe();
  });
  it('Should return 4', () => {
    expect(vtsAggregatePipe.transform([1, 2, 3, 4], 'max')).toEqual(4);
  });

  it('Should return 1', () => {
    expect(vtsAggregatePipe.transform([1], 'max')).toEqual(1);
  });

  it('Should return 1', () => {
    expect(vtsAggregatePipe.transform([1, 1], 'max')).toEqual(1);
  });

  it('Should return undefined', () => {
    expect(vtsAggregatePipe.transform([], 'max')).toBeUndefined();
  });

  it('Should return 1', () => {
    expect(vtsAggregatePipe.transform([1, 2, 3, 4], 'min')).toEqual(1);
  });

  it('Should return 2', () => {
    expect(vtsAggregatePipe.transform([4, 3, 2, 5], 'min')).toEqual(2);
  });

  it('Should return 1', () => {
    expect(vtsAggregatePipe.transform([1], 'min')).toEqual(1);
  });

  it('Should return 1', () => {
    expect(vtsAggregatePipe.transform([1, 1], 'min')).toEqual(1);
  });

  it('Should return undefined', () => {
    expect(vtsAggregatePipe.transform([], 'min')).toBeUndefined();
  });

  it('Should return 10', () => {
    expect(vtsAggregatePipe.transform([1, 2, 3, 4], 'sum')).toEqual(10);
  });

  it('Should return 1', () => {
    expect(vtsAggregatePipe.transform([1], 'sum')).toEqual(1);
  });

  it('Should return 2', () => {
    expect(vtsAggregatePipe.transform([1, 1], 'sum')).toEqual(2);
  });

  it('Should return 2.5', () => {
    expect(vtsAggregatePipe.transform([1, 2, 3, 4], 'avg')).toEqual(2.5);
  });

  it('Should return 1', () => {
    expect(vtsAggregatePipe.transform([1], 'avg')).toEqual(1);
  });

  it('Should return 1', () => {
    expect(vtsAggregatePipe.transform([1, 1], 'avg')).toEqual(1);
  });

  it('Should return undefined', () => {
    expect(vtsAggregatePipe.transform([], 'avg')).toBeUndefined();
  });
});
