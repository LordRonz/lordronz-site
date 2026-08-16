import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GET } from '@/app/api/now-playing/route';
import { getNowPlaying } from '@/lib/spotify';

vi.mock('@/lib/spotify', () => ({
  getNowPlaying: vi.fn(),
}));

const mockedGetNowPlaying = vi.mocked(getNowPlaying);

describe('GET /api/now-playing', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns the fallback for a Spotify 400 response', async () => {
    mockedGetNowPlaying.mockResolvedValueOnce(
      new Response(JSON.stringify({ error: { status: 400 } }), { status: 400 }),
    );

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ isPlaying: false });
  });

  it('returns the fallback for a Spotify 204 response', async () => {
    mockedGetNowPlaying.mockResolvedValueOnce(
      new Response(null, { status: 204 }),
    );

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ isPlaying: false });
  });

  it('maps a valid Spotify response', async () => {
    mockedGetNowPlaying.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          item: {
            album: {
              images: [{ url: 'https://example.com/album.jpg' }],
              name: 'Album',
            },
            artists: [{ name: 'Artist' }],
            external_urls: {
              spotify: 'https://open.spotify.com/track/example',
            },
            name: 'Song',
          },
          is_playing: true,
        }),
        { status: 200 },
      ),
    );

    const response = await GET();

    expect(await response.json()).toEqual({
      album: 'Album',
      albumImageUrl: 'https://example.com/album.jpg',
      artist: 'Artist',
      isPlaying: true,
      songUrl: 'https://open.spotify.com/track/example',
      title: 'Song',
    });
  });
});
