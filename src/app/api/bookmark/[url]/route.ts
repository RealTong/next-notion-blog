import {unfurl} from "unfurl.js";
import {NextRequest} from "next/server";

export const revalidate = 0
export const GET = async (_request: NextRequest, {params}: {
  params: { url: string }
}) => {
  const {url} = params
  if (!url || url === 'null') {
    return Response.json({error: 'url is required'}, {status: 400})
  }
  const decodeURL = decodeURIComponent(url as string)
  const linkPreview = await unfurl(decodeURL, {})
  return Response.json(linkPreview, {status: 200})
}
