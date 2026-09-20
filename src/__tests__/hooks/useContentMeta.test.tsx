import { renderHook, waitFor } from '@testing-library/react';
import * as React from 'react';
import useSWR from 'swr';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useContentMeta from '@/hooks/useContentMeta';
import { incrementBlogView } from '@/lib/actions/incrementBlogView';

const mutateMock = vi.fn();

vi.mock('swr', () => ({
  default: vi.fn(() => ({
    data: { result: { currentViews: 5 } },
    mutate: mutateMock,
  })),
}));

vi.mock('@/lib/actions/incrementBlogView', () => ({
  incrementBlogView: vi.fn(),
}));

const mockedUseSWR = vi.mocked(useSWR);
const mockedIncrementBlogView = vi.mocked(incrementBlogView);

describe('useContentMeta', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedIncrementBlogView.mockResolvedValue(6);
  });

  it('returns the current views from SWR data', () => {
    const { result } = renderHook(() => useContentMeta('my-post'));

    expect(result.current).toEqual({ currentViews: 5 });
    expect(mockedUseSWR).toHaveBeenCalledWith(
      '/api/content/my-post',
      expect.any(Function),
    );
  });

  it('increments once with the slug and mutates the SWR cache with the returned views', async () => {
    renderHook(() => useContentMeta('my-post', { runIncrement: true }));

    await waitFor(() => {
      expect(mockedIncrementBlogView).toHaveBeenCalledTimes(1);
    });
    expect(mockedIncrementBlogView).toHaveBeenCalledWith('my-post');
    expect(mutateMock).toHaveBeenCalledWith({ result: { currentViews: 6 } });
  });

  it('increments exactly once across re-renders of the same hook instance', async () => {
    const { rerender } = renderHook(
      (props: { runIncrement: boolean }) =>
        useContentMeta('my-post', { runIncrement: props.runIncrement }),
      { initialProps: { runIncrement: false } },
    );

    rerender({ runIncrement: true });

    await waitFor(() => {
      expect(mockedIncrementBlogView).toHaveBeenCalledTimes(1);
    });

    rerender({ runIncrement: true });
    rerender({ runIncrement: true });

    expect(mockedIncrementBlogView).toHaveBeenCalledTimes(1);
    expect(mockedIncrementBlogView).toHaveBeenCalledWith('my-post');
  });

  it('increments exactly once per hook instance under React.StrictMode double effects', async () => {
    renderHook(() => useContentMeta('my-post', { runIncrement: true }), {
      wrapper: React.StrictMode,
    });

    await waitFor(() => {
      expect(mockedIncrementBlogView).toHaveBeenCalledTimes(1);
    });
    expect(mockedIncrementBlogView).toHaveBeenCalledWith('my-post');
    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({ result: { currentViews: 6 } });
    });
  });

  it('never calls the increment action when runIncrement is false (default)', async () => {
    renderHook(() => useContentMeta('my-post'));

    await waitFor(() => {
      expect(mockedUseSWR).toHaveBeenCalled();
    });
    expect(mockedIncrementBlogView).not.toHaveBeenCalled();
    expect(mutateMock).not.toHaveBeenCalled();
  });
});
