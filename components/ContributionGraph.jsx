import {useCallback, useEffect, useMemo, useState} from "react";
import dynamic from "next/dynamic";

const GithubCalendar = dynamic(() => import("react-github-calendar"), {
    ssr: false
})
function GetContributionGraph() {
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
        </GithubCalendar>
    )
}
export default GetContributionGraph;