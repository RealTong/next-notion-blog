import NotionText from "./NotionText";

const Heading1 = ({value}: any) => {
  return (
    <h1 className={'mt-12 mb-5 text-2xl font-bold leading-7 snap-mt-20'}>
      <NotionText text={value.rich_text}/>
    </h1>
  )
}
export default Heading1
