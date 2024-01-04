import NowPlaying from './NowPlaying'
import GetContributionGraph from './ContributionGraph'
import { getDictionary } from '../locale/dictionaries'
import { getNowPlaying } from '../lib/spotify'

async function Activity() {
  const i18n = await getDictionary('en-US')
  const song = await getNowPlaying()
  return (
    <div>
      <p className={'my-4 text-3xl font-bold'}>{i18n.index.activity.title}</p>
      <div className={'flex justify-center'}>{song.isPlaying ? <NowPlaying song={song} /> : <GetContributionGraph />}</div>
    </div>
  )
}

export default Activity
