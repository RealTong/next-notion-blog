import NotionText from "./NotionText";

const Heading2 = ({value}: any) => {
  return (
    <h2 className={'mt-5 mb-4 text-xl font-bold leading-7 snap-mt-16'}>
      <NotionText text={value.rich_text}/>
    </h2>
  )
}
export default Heading2
