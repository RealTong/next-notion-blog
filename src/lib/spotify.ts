import 'server-only'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = btoa(`${client_id}:${client_secret}`)

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
  })
  return response.json()
}
const getCoverBase64 = async (url: string) => {
  const res = await fetch(url)
  const buff = await res.arrayBuffer()

  return Buffer.from(buff).toString('base64')
}

const getTopTracks = async () => {
  const {access_token} = await getAccessToken()
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  return response.json()
}
const getNowPlaying = async () => {
  try {
    const {access_token} = await getAccessToken()
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    })
    if (response.status === 204 || response.status > 400) {
      return {
        isPlaying: false,
      }
    }
    const data = await response.json()
    if (data.item === null) {
      return {
        isPlaying: false,
      }
    }
    return {
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((_artist) => _artist.name).join(', '),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images[0].url,
      songUrl: data.item.external_urls.spotify,
    }
  } catch (err) {
    return {
      isPlaying: false,
      hasError: true,
    }
  }
}

const getNowPlayingSVG = async ({coverFormat}: { coverFormat: 'url' | 'base64' } = {coverFormat: 'url'}) => {
// : Promise<TrackInfo | { isPlaying: false }> {
  const track = await getTopTracks()

  if (track === null) {
    return {
      isPlaying: false,
    }
  }

  if (coverFormat === 'base64') {
    const coverBase64 = await getCoverBase64(track.coverUrl)

    return {
      ...track,
      coverUrl: `data:image/jpeg;base64,${coverBase64}`,
    }
  }

  return track
}
export {getTopTracks, getNowPlaying,getNowPlayingSVG}
