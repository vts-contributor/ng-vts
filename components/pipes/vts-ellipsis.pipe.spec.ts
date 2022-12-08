import { VtsEllipsisPipe } from './vts-ellipsis.pipe';

describe('VtsEllipsisPipe', () => {
  let pipe: VtsEllipsisPipe;

  beforeEach(() => {
    pipe = new VtsEllipsisPipe();
  });

  it('Should truncate', () => {
    expect(pipe.transform('Hello World', 4, '')).toEqual('Hell');
  });

  it('Should return the input', () => {
    expect(pipe.transform('Hello', 10)).toEqual('Hello');
  });
});
