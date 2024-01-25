import NotionText from "./NotionText";

const Paragraph = ({value}: any) => {
  return (
    <p className="my-4 font-light leading-7">
      <NotionText text={value.rich_text}/>
    </p>
  )
}
export default Paragraph
