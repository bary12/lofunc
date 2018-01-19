import {assert} from 'chai';
import F from '../src/lofunc';

describe('F.mult', () => {
  it('Multiply', () => {
    const func = F.compose(
      (x, y) => `${x}, ${y}`,
      F.mult(
        x => x + 1,
        y => y - 1
      )
    );

    assert.equal(func(1, 1), '2, 0');
  });
});
