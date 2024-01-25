import {getNowPlayingSVG} from '@/lib/spotify'

export const revalidate = 0
export const GET = async (_request:Request,response: Response) => {
  const song = await getNowPlayingSVG({coverFormat: 'url'})
  response.headers.set('Cache-Control', `s-maxage=1`)
  response.headers.set('Content-Type', 'image/svg+xml');
  return Response.json(song, {status: 200})
}
