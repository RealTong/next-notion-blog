import {getNowPlaying} from '../../../lib/spotify'

export const GET = async (request: Request) => {
  const song = await getNowPlaying()
  console.log(request)
  return Response.json(song)
}
