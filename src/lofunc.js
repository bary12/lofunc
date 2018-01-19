import _ from 'lodash';

const F = {
  Tuple: class Tuple {
    /**
     * Creates a new tuple.
     *
     * @param {Array.<*>} elements - The elements of the tuple.
     */
    constructor (...elements) {
      this.elements = elements;
    }
  },

  /**
   * Composes the given functions.
   *
   * @param {Array.<Function>} funcs - The functions to compose.
   * @returns {Function} The composed function.
   */
  compose (...funcs) {
    if (funcs.length === 0) {
      return x => x;
    }
    const last = _.last(funcs);
    const rest = _.slice(funcs, 0, funcs.length - 1);

    return (...x) => {
      const compute = last(...x);
      const value = compute instanceof F.Tuple ? compute.elements : [compute];

      return F.compose(...rest)(...value);
    };
  },

  /**
   * Composes the given functions, in reverse order.
   *
   * @param {Array.<Function>} funcs - The functions to compose.
   * @returns {Function} The composed function.
   */
  chain (...funcs) {
    return F.compose(..._.reverse(funcs));
  },

  /**
   * Returns a function with spread arguments instead of array arguments.
   *
   * @param {Function} func - The function to spread.
   * @returns {Function} The spreaded function.
   */
  spread (func) {
    return (...args) => func(args);
  },

  /**
   * The reverse of {@see F.spread}.
   *
   * @param {Function} func - The function to unspread.
   * @returns {Function} The unspreaded function.
   */
  unspread (func) {
    return args => func(...args);
  },

  /**
   * @example
   *   const func = F.object({
   *     a: x => x + 1,
   *     b: x => x - 1
   *   });
   *
   *   func({a: 1, b: 1}); // {a: 2, b: 0}
   *
   * @param {Object} funcObj - An object conatining functions as values.
   * @returns {Function.<Object, Object>} A function that accepts an object and modifies each of the keys.
   */
  object (funcObj) {
    return obj => {
      _.forEach(obj, (value, key) => {
        if (key in funcObj && funcObj[key] instanceof Function) {
          obj[key] = funcObj[key](value);
        }
      });

      return obj;
    };
  },

  /**
   * Function cartesian multiplication.
   *
   * @example
   *   const func = F.compose(
   *     (x, y) => x + ', ' + y
   *     F.mult(
   *       x => x + 1,
   *       x => x - 1
   *     )
   *   )
   *
   *  func(1, 1) // '2, 0'
   *
   * @param {Array.<Function>} funcs - The functions to multiply.
   * @returns {Function} The cartesian product of the functions.
   */
  mult (...funcs) {
    return (...x) => new F.Tuple(..._.map(funcs, (f, i) => f(x[i])));
  },

  _: {
    /**
     * Similar to Array.map, _.map.
     *
     * @param {Function} cb - The map callback.
     * @returns {Function} The mapping function.
     */
    map (cb) {
      return arr => _.map(arr, cb);
    },

    /**
     * Similar to Array.filter, _.filter.
     *
     * @param {Function} cb - The filter callback.
     * @returns {Function} The filtering function.
     */
    filter (cb) {
      return arr => _.filter(arr, cb);
    }
  }
};

export default F;
