// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(timeout);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
    
    jest.advanceTimersByTime(interval * 2);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinMock = jest.spyOn(require('path'), 'join');
    joinMock.mockReturnValue('/mock/path/file.txt');

    await readFileAsynchronously('test.txt');

    expect(joinMock).toHaveBeenCalledWith(__dirname, 'test.txt');
    joinMock.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const existsSyncMock = jest.spyOn(require('fs'), 'existsSync');
    existsSyncMock.mockReturnValue(false);

    const joinMock = jest.spyOn(require('path'), 'join');
    joinMock.mockReturnValue('/mock/path/nonexistent.txt');

    const result = await readFileAsynchronously('nonexistent.txt');

    expect(result).toBeNull();

    existsSyncMock.mockRestore();
    joinMock.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const mockFileContent = 'Hello, World!';
    
    const existsSyncMock = jest.spyOn(require('fs'), 'existsSync');
    existsSyncMock.mockReturnValue(true);

    const readFileMock = jest.spyOn(require('fs/promises'), 'readFile');
    readFileMock.mockResolvedValue(Buffer.from(mockFileContent));

    const joinMock = jest.spyOn(require('path'), 'join');
    joinMock.mockReturnValue('/mock/path/existing.txt');

    const result = await readFileAsynchronously('existing.txt');

    expect(result).toBe(mockFileContent);
    expect(readFileMock).toHaveBeenCalledWith('/mock/path/existing.txt');

    existsSyncMock.mockRestore();
    readFileMock.mockRestore();
    joinMock.mockRestore();
  });
});
