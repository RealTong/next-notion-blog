import {Colors} from "../NotionBlockColors";
import NotionText from "./NotionText";

const NotionCallout = ({value}: {
  value: any
}) => {
  // read first bg color of text as callout background color
  let calloutBackgroundColor = value.color

  let calloutTextBgColor = value.rich_text[0].annotations.color

  calloutTextBgColor = calloutTextBgColor.endsWith('_background') ? calloutTextBgColor.replace('_background', '') : 'gray'

  calloutBackgroundColor = calloutBackgroundColor.endsWith('_background') ? calloutBackgroundColor.replace('_background', '') : 'gray'


  const icon = value.icon.emoji

  function iconTransformer(icon: any) {
    switch (icon) {
      case 'ℹ️':
        return <span className={'i-bi-info'}></span>
      // return <Info size={20} />
      case '⚠️':
        return <span className={'i-bi-alarm'}></span>
      case '🔔':
        return <span className={'i-bi-bell'}></span>
      // return <AlertTriangle size={20} />
      default:
        return <span className={'i-bi-info'}></span>
    }
  }

  return (
    <p
      className={`flex p-5 my-4 space-x-3 rounded-2xl ${Colors[calloutBackgroundColor].bg.normal} ${Colors[calloutBackgroundColor].text.normal}`}>
            <span className="flex items-center">
                {iconTransformer(icon)}
            </span>
      <span>
                <NotionText text={value.rich_text} inheritColor={true}/>
            </span>
    </p>
  )

}
export default NotionCallout
