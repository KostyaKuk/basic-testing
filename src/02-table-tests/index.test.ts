// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 8, b: 2, action: Action.Subtract, expected: 6 },
    { a: 1, b: 2, action: Action.Subtract, expected: -1 },

    { a: 3, b: 4, action: Action.Multiply, expected: 12 },
    { a: 8, b: 2, action: Action.Multiply, expected: 16 },
    { a: 10, b: 2, action: Action.Multiply, expected: 20 },

    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 8, b: 2, action: Action.Divide, expected: 4 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },

    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
    { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5 },
];

const invalidInput = [
  { a: 1, b: 2, action: '%', expected: null },
  { a: 5, b: 3, action: '@', expected: null },
  { a: 2, b: 4, action: null, expected: null },
  { a: 2, b: 4, action: undefined, expected: null },

  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 1, b: '2', action: Action.Add, expected: null },
  { a: '5', b: '3', action: Action.Multiply, expected: null },
  { a: null, b: 2, action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {

  test.each(testCases)( 'should calculate $a $action $b = $expected', ({a, b, action, expected}) => {
    const res = simpleCalculator({a, b, action})
    expect(res).toBe(expected);
  });

  test.each(invalidInput)(
    'should return null for invalid input',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    }
  );
 
});

