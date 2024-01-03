'use client'

import MusicBar from './MusicBar'
import Link from 'next/link'

function NowPlaying({ song }) {
  return (
    <div className="mb-8 flex w-full flex-row items-center space-x-4">
      {/*<MusicBar />*/}
      <div className={'i-simple-icons-spotify transform rotate-45'}></div>
      <div className="inline-flex flex-col justify-center  truncate">
        <Link
          className="capsize max-w-max truncate font-medium  text-gray-800 dark:text-gray-200"
          href={song.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {song.title}
        </Link>
      </div>
    </div>
  )
}

export default NowPlaying
