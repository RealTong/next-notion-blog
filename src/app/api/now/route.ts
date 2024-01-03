import { getNowPlaying } from '../../../lib/spotify'

export const GET = async () => {
  console.log('get now playing')
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    // res.status(200).json({ isPlaying: false })
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
  }

  const song = await response.json()

  if (song.item === null) {
    // res.status(200).json({ isPlaying: false })
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
  }

  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  // res.status(200).json({
  //   album,
  //   albumImageUrl,
  //   artist,
  //   isPlaying,
  //   songUrl,
  //   title,
  // })
  return new Response(
    JSON.stringify({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
