import {assert} from 'chai';
import F from '../src/lofunc';

describe('F.spread', () => {
  it('Spread', () => {
    const sum = arr => arr.reduce((a, b) => a + b);
    const sums = F.spread(sum);

    assert.equal(sums(1, 2, 3), 6);
    assert.equal(sums('a', 'b', 'c'), 'abc');
  });
});

describe('F.unspread', () => {
  it('Unspread', () => {
    const addThree = F.unspread((a, b, c) => a + b + c);

    assert.equal(addThree([1, 2, 3]), 6);
    assert.equal(addThree(['a', 'b', 'c']), 'abc');
  });
});
