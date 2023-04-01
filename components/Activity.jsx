import NowPlaying from "./NowPlaying";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import GetContributionGraph from "./ContributionGraph";

function Activity() {
    const {data, isLoading} = useSWR("/api/now", fetcher);

    return (
        <div className={""}>
            <p className={"my-4 text-3xl font-bold"}>Activity</p>
            <div className={"flex justify-center"}>
                {
                    data ? <NowPlaying song={data}/> :<GetContributionGraph />
                }
            </div>
        </div>
    )
}

export default Activity;