import NowPlaying from './NowPlaying'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import GetContributionGraph from './ContributionGraph'
import {getDictionary} from "../locale/dictionaries";

async function Activity() {
  const i18n = await getDictionary('en-US')
  const { data } = useSWR('/api/now', fetcher)
  return (
    <div className={''}>
      <p className={'my-4 text-3xl font-bold'}>{i18n.index.activity.title}</p>
      <div className={'flex justify-center'}>{data?.songUrl ? <NowPlaying song={data} /> : <GetContributionGraph />}</div>
    </div>
  )
}

export default Activity
