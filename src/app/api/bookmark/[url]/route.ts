import {NextApiRequest, NextApiResponse} from "next";
import {unfurl} from "unfurl.js";
import {NextResponse} from "next/server";

type Data = Awaited<ReturnType<typeof unfurl>>

export const revalidate = 0
export const GET = async (request: NextApiRequest, {params}: {
  params: { url: string }
}, response: NextResponse) => {
  const {url} = params
  if (!url) {
    return Response.json({error: 'url is required'}, {status: 400})
  }
  const decodeURL = decodeURIComponent(url as string)
  const linkPreview = await unfurl(decodeURL, {})
  return Response.json(linkPreview, {status: 200})
}
