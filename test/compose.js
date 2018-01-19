import {assert} from 'chai';
import F from '../src/lofunc';

describe('F.compose', () => {
  it('Basic', () => {
    assert.deepEqual(
      [1, 2, 3]
        .map(F.compose(x => x + 1, x => 2 * x)),
      [3, 5, 7]
    );
  });

  it('Multi variable', () => {
    const func = F.compose(
      (x, y) => x * y,
      (x, y) => new F.Tuple(x + 1, y + 1)
    );

    assert.equal(func(5, 6), 42);
  });

  it('Empty', () => {
    const values = [5, 'hello', -12, null, undefined];

    assert.deepEqual(values.map(F.compose()), values);
  });
});

describe('F.composeReverse', () => {
  it('Reverse', () => {
    assert.deepEqual(
      [1, 2, 3]
        .map(F.composeReverse(x => x + 1, x => 2 * x)),
      [4, 6, 8]
    );
  });
});

