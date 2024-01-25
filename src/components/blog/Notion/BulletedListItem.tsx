import NotionText from "./NotionText";
import {Fragment} from "react";
import NotionRender from "./NotionRender";

const BulletedListItem = ({value}: any) => {
  return (
    <ul className="ml-5 my-2 list-disc list-outside font-light">
      <li>
        <NotionText text={value.rich_text}/>
        {value.children?.map((block: any) => (
          <Fragment key={block.id}><NotionRender block={block}/></Fragment>
        ))}
      </li>
    </ul>
  )
}

export default BulletedListItem
