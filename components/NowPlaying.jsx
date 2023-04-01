import MusicBar from "./MusicBar";

function NowPlaying({song}) {
    return (
        <div className="flex items-center flex-row mb-8 space-x-4 w-full">
            <MusicBar/>
            <div className="inline-flex justify-center flex-col  truncate">
                <a
                    className="capsize text-gray-800 dark:text-gray-200 font-medium  max-w-max truncate"
                    href={song.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {song.title}
                </a>
            </div>
        </div>
    );
}

export default NowPlaying;