import NotionText from "./NotionText";

const Heading3 = ({value}: any) => {
  return (
    <h3 className={'mt-4 mb-3 text-lg font-bold leading-7 snap-mt-16'}>
      <NotionText text={value.rich_text}/>
    </h3>
  )
}
export default Heading3
