import { VtsTrimPipe } from './vts-trim.pipe';

describe('VtsTrimPipe', () => {
  let pipe: VtsTrimPipe;

  beforeEach(() => {
    pipe = new VtsTrimPipe();
  });

  it('Should trim whitespace from string', () => {
    const result = pipe.transform('   foo bar   ');
    expect(result).toEqual('foo bar');
  });
});
