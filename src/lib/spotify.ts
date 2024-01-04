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

const getTopTracks = async () => {
  const { access_token } = await getAccessToken()
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
    const { access_token } = await getAccessToken()
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

export { getTopTracks, getNowPlaying }
