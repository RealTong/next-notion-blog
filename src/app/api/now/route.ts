import {getNowPlaying} from '../../../lib/spotify'
import {NextResponse} from "next/server";

export const GET = async () => {
  console.log('get now playing')
  const response = await getNowPlaying()
  return NextResponse.json(response)
}
