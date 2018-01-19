# Lofunc

Lofunc is a higher-order functional programming library. It manipulates functions. It aims to make functional programming in Javascript better.

## Examples

One of the most useful features of Lofunc is `F.object`. It returns a function that handles each of the keys of an object differently.

```javascript
import F from 'lofunc';

const david = {
  name: 'David',
  age: 21
}

const func = F.object({
  name: name => name + ' the old',
  age: age => age * 4
});

func(david); // {name: 'David the old', age: 84}
```

The `F.compose` function allows for functional composition.

```javascript
// Equivalent to x => x * 2 + 1
const func = F.compose(
  x => x + 1,
  x => x * 2
)

func(3); // 7
```

For readability, `F.chain` is also provided. This just performs `F.compose` in the oposite order.

```javascript
// Equivalent to x => (x + 1) * 2
const func = F.chain(
  x => x + 1,
  x => x * 2
)

func(3); // 8
```

Lofunc also provides the `F._` object, which contains lodash hooks (currently only for `_.map` and `_.filter`). i.e.

```javascript
const david = {
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
}

const func = F.object({
  name: x => x + ' the cat lover',
  cats: F.chain(
      F._.filter(cat => cat.age > 5),
      F._.map(F.object({
        name: name => name + ' the cat'
      }))
    )
});

func(david);
/*
{
  name: 'David the cat lover',
  cats: [
    {
      name: 'Dave the cat',
      age: 7
    }
  ]
}
*/
```

Get ready to see this little smiley face `._.` in your code.


## Utility functions

Lofunc provides utility functions, `F.spread` and `F.unspread`, which convert a function that accepts an array to a function with rest parameters and vice versa.

```javascript
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

F.spread(sum)(1, 2, 3); // 6
```

```javascript
function addThree(a, b, c) {
  return a + b + c;
}

F.unspread(addThree)([1, 2, 3]); // 6
```