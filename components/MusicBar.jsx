function MusicBar() {
    return (
        <div className="relative flex justify-between w-6 h-6">
            <span className={"w-1.5 h-full bg-[#1ED760] rounded-xl animate-[health_1.6s_ease_infinite_alternate] origin-bottom"}></span>
            <span className={"w-1.5 h-full bg-[#1ED760] rounded-xl animate-[health_2.4s_ease_infinite_alternate] origin-bottom"}></span>
            <span className={"w-1.5 h-full bg-[#1ED760] rounded-xl animate-[health_3.0s_ease_infinite_alternate] origin-bottom"}></span>
        </div>
    )
}

export default MusicBar;