import { renderHook, act } from '@testing-library/react';
import useFetch from './useFetch';

describe('useFetch Hook', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should handle successful fetch', async () => {
    const mockData = { data: [{ id: 1, title: 'Test Tour' }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('http://test-url'));

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual([]);

    // Wait for the fetch to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // After fetch completes
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(mockData.data);
  });

  test('should handle fetch error', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useFetch('http://test-url'));

    // Wait for the fetch to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('failed to fetch');
    expect(result.current.data).toEqual([]);
  });
}); 