function MusicBar() {
  return (
    <div className="relative flex h-6 w-6 justify-between">
      <span className={'h-full w-1.5 origin-bottom animate-[health_1.6s_ease_infinite_alternate] rounded-xl bg-[#1ED760]'}></span>
      <span className={'h-full w-1.5 origin-bottom animate-[health_2.4s_ease_infinite_alternate] rounded-xl bg-[#1ED760]'}></span>
      <span className={'h-full w-1.5 origin-bottom animate-[health_3.0s_ease_infinite_alternate] rounded-xl bg-[#1ED760]'}></span>
    </div>
  )
}

export default MusicBar
