import { VtsToCssUnitPipe } from './vts-css-unit.pipe';

describe('VtsToCssUnitPipe', () => {
  let pipe: VtsToCssUnitPipe;

  beforeEach(() => {
    pipe = new VtsToCssUnitPipe();
  });

  describe('number', () => {
    it('Should ToCssUnit', () => {
      expect(pipe.transform(100)).toEqual('100px');
    });

    it('Should ToCssUnit', () => {
      expect(pipe.transform(100, 'px')).toEqual('100px');
    });

    it('Should ToCssUnit but defaultUnit is defined', () => {
      expect(pipe.transform(100, 'pt')).toEqual('100pt');
    });
  });

  describe('string', () => {
    it('Should ToCssUnit but typeof value is String', () => {
      expect(pipe.transform('100px')).toEqual('100px');
    });

    it('Should ToCssUnit but defaultUnit is defined and typeof value is String', () => {
      expect(pipe.transform('100px', 'pt')).toEqual('100px');
    });
  });
});
