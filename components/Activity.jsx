import {useEffect, useState, useCallback, useMemo} from "react";
import dynamic from "next/dynamic";

const GithubCalendar = dynamic(() => import("react-github-calendar"), {
    ssr: false
})

const ReactTooltip = dynamic(() => import("react-tooltip"), {
    ssr: false,
});

function getContributionGraph() {
    const [windowSize, setWindowSize] = useState()
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    useEffect(() => setMounted(true), []);
    const isMediumCalendar = mounted && windowSize.width && windowSize.width > 450;
    const isLargeCalendar = mounted && windowSize.width && windowSize.width > 640;

    // useCallback because it has a dependency from useWindowSize which fires on resize
    const transformData = useCallback(
        (contributions) => {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();
            const shownMonths = isMediumCalendar ? 8 : 6;

            return contributions.filter((day) => {
                const date = new Date(day.date);
                const monthOfDay = date.getMonth();

                return (
                    date.getFullYear() === currentYear &&
                    monthOfDay > currentMonth - shownMonths &&
                    monthOfDay <= currentMonth
                );
            });
        },
        [isMediumCalendar]
    );

    // useMemo because useWindowWidth renders on window resize listener
    const resizeCalendar = useMemo(
        () => (isLargeCalendar ? undefined : transformData),
        [isLargeCalendar, transformData]
    );

    return (
        <GithubCalendar
            username={"RealTong"}
            transformData={resizeCalendar}
            hideColorLegend={true}
            hideMonthLabels={true}
            hideTotalCount={true}
        >
            {/*<ReactTooltip html/>*/}
        </GithubCalendar>
    )

}


function Activity() {
    return (
        <div className={""}>
            <p className={"my-4 text-3xl font-bold"}>Activity</p>
            <div className={"flex justify-center"}>
                {
                    getContributionGraph()
                }
            </div>
        </div>
    )
}

export default Activity;