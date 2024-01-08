import {getNowPlayingSVG} from '../../../lib/spotify'
import {NextResponse} from "next/server";

export const revalidate = 0
export const GET = async (request: Request, response: Response) => {
  const song = await getNowPlayingSVG({coverFormat: 'url'})
  response.headers.set('Cache-Control', `s-maxage=1`)
  response.headers.set('Content-Type', 'image/svg+xml');
  return response.json()
}
