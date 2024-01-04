import {getNowPlaying} from '../../../lib/spotify'

export const revalidate = 0
export const GET = async () => {
  const song = await getNowPlaying()
  return Response.json(song)
}
