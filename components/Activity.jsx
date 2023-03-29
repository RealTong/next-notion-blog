import GitHubCalendar from "react-github-calendar";

function Activity() {
    return (
        <div className={""}>
            <p className={"my-4 text-3xl font-bold"}>Activity</p>
            <div className={"flex justify-center"}>
                <GitHubCalendar
                    username={"RealTong"}
                    hideColorLegend={true}
                    hideMonthLabels={true}
                    hideTotalCount={true}
                />
            </div>
        </div>
    )
}

export default Activity;