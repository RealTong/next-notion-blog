import Image from 'next/image'

export const getMediaCtx = (value) => {
  const src = value.type === 'external' ? value.external.url : value.file.url
  const expire = value.type === 'file' ? value.file.expiry_time : null
  const caption = value.caption[0] ? value.caption[0].plain_text : ''
  return { src, caption, expire }
}

function NotionImage({ value }) {
  const { src: imageSrc, caption: imageCaption } = getMediaCtx(value)
  const {
    dim: { width, height },
  } = value
  return (
    <figure>
      {width && height ? (
        <Image src={imageSrc} alt={imageCaption} width={width} height={height} className="rounded" />
      ) : (
        <Image src={imageSrc} alt={imageCaption} className="rounded" />
      )}
      {imageCaption && <figcaption className="text-center">{imageCaption}</figcaption>}
    </figure>
  )
}
export default NotionImage
