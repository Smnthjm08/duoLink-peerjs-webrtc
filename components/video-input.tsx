import React from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
  playerId: string | number; // More specific typing for playerId
  url: string | any;
  muted?: boolean;
  playing?: boolean;
}

const Player: React.FC<PlayerProps> = (props) => {
  const { playerId, url, muted = false, playing = false } = props;
  return (
    <div>
      <ReactPlayer
        url={url}
        key={playerId}
        muted={muted}
        playing={playing}
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Player;
