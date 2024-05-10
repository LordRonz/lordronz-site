import { getNowPlaying } from '@/lib/spotify';
import { SpotifySong } from '@/types/spotify';

export const revalidate = 10; // in seconds
// false | 0 | number

export const GET = async () => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return Response.json({ isPlaying: false });
  }

  const song: SpotifySong = await response.json();

  if (song.item === null) {
    return Response.json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return Response.json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  });
};
