// useWindowDimensions.test.js
import { renderHook } from '@testing-library/react';
import { act } from 'react';

import useWindowDimensions from '@/hooks/useWindowDimensions';

describe('useWindowDimensions', () => {
  // Mock window object before tests
  const mockWindowWidth = 1024;
  const mockWindowHeight = 768;
  global.innerWidth = mockWindowWidth;
  global.innerHeight = mockWindowHeight;

  test('should initialize with window dimensions', () => {
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current.width).toBe(mockWindowWidth);
    expect(result.current.height).toBe(mockWindowHeight);
  });

  test('should update dimensions on window resize', () => {
    const { result } = renderHook(() => useWindowDimensions());

    act(() => {
      // Simulate a window resize event
      global.innerWidth = 800;
      global.innerHeight = 600;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  test('should unsubscribe from resize events on unmount', () => {
    const { unmount } = renderHook(() => useWindowDimensions());

    const spyRemoveEventListener = jest.spyOn(window, 'removeEventListener');
    unmount();

    expect(spyRemoveEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
    spyRemoveEventListener.mockRestore();
  });
});
