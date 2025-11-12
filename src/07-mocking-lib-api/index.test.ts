// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn), 
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    mockedAxios.create.mockReturnValue({ get: mockGet } as any);
    
    await throttledGetDataFromApi('/test');
    
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/users/1';
    const mockData = { id: 1, name: 'Kukushkin' };
    
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    mockedAxios.create.mockReturnValue({ get: mockGet } as any);
    
    await throttledGetDataFromApi(relativePath);
    
    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/friends/1';
    const mockData = { id: 1, body: 'Test' };
    
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    mockedAxios.create.mockReturnValue({ get: mockGet } as any);
    
    const result = await throttledGetDataFromApi(relativePath);
    
    expect(result).toEqual(mockData);
  });
});