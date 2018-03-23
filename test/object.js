import {assert} from 'chai';
import F from '../src/lofunc';

describe('F.object', () => {
  it('Basic', () => {
    const obj = {
      a: 15,
      b: 11
    };

    const func = F.object({
      a: x => x + 1,
      b: x => 2 * x
    });

    assert.deepEqual(func(obj), {
      a: 16,
      b: 22
    });
  });

  it('Object does not contain key', () => {
    const obj = {
      a: 1
    };

    const func = F.object({
      b: x => x + 1
    });

    assert.deepEqual(func(obj), obj);
  });

  it('Lodash hooks', () => {
    const person = {
      name: 'David',
      cats: [
        {
          name: 'Dave',
          age: 7
        },
        {
          name: 'Davis',
          age: 2
        }
      ]
    };

    const func = F.object({
      name: x => x + ' the cat lover',
      cats: F.chain(
        F.filter(cat => cat.age > 5),
        F.map(F.object({
          name: name => name + ' the cat'
        }))
      )
    });

    assert.deepEqual(func(person), {
      name: 'David the cat lover',
      cats: [
        {
          name: 'Dave the cat',
          age: 7
        }
      ]
    });
  });

  it('Arrays', () => {
    const arr = [1, 2, 3];
    const func = F.object([
      x => x + 1,
      x => x + 2,
      x => x + 3
    ]);

    assert.deepEqual(func(arr), [2, 4, 6]);
  });

  it('Arrays and objects', () => {
    const arr = [1, 4, -7];
    const func = F.object({
      2: x => x + 7
    });

    assert.deepEqual(func(arr), [1, 4, 0]);
  });

  it('Should be Immutable', () => {
    const obj = {
      a: 'b',
      b: ['c', 'c'],
      c: 'd'
    };

    const func = F.object({
      a: x => x.length,
      b: F.map(x => x + 'a'),
      c: x => `This is ${x}.`
    });

    assert.notDeepEqual(obj, func(obj));
    assert.deepEqual(obj, {
      a: 'b',
      b: ['c', 'c'],
      c: 'd'
    });
  });
});
