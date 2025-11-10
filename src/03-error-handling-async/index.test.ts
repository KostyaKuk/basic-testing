// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(123)).resolves.toBe(123);
    await expect(resolveValue(null)).resolves.toBe(null);
    await expect(resolveValue(undefined)).resolves.toBe(undefined);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const customMessage = 'Provided error message';
    expect(() => throwError(customMessage)).toThrow(customMessage);
    expect(() => throwError(customMessage)).toThrow(Error);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
    expect(() => throwError()).toThrow(Error);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
