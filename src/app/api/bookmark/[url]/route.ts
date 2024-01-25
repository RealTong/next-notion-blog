import {unfurl} from "unfurl.js";

export const revalidate = 0
export const GET = async ({params}: {
  params: { url: string }
}) => {
  const {url} = params
  if (!url || url ==='null') {
    return Response.json({error: 'url is required'}, {status: 400})
  }
  const decodeURL = decodeURIComponent(url as string)
  const linkPreview = await unfurl(decodeURL, {})
  return Response.json(linkPreview, {status: 200})
}
