import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

interface VideoControlsProps {
  playerId: string;
  muted: boolean;
  videoEnabled: boolean;
  onToggleMute: (playerId: string) => void;
  onToggleVideo: (playerId: string) => void;
  onEndCall: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  playerId,
  muted,
  videoEnabled,
  onToggleMute,
  onToggleVideo,
  onEndCall,
}) => {
  return (
    <div className="flex space-x-4 mt-4">
      <Button
        variant={muted ? "destructive" : "secondary"}
        size="icon"
        className="rounded-full"
        onClick={() => onToggleMute(playerId)}
      >
        {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      <Button
        variant={videoEnabled ? "secondary" : "destructive"}
        size="icon"
        onClick={() => onToggleVideo(playerId)}
      >
        {videoEnabled ? (
          <Video className="h-4 w-4" />
        ) : (
          <VideoOff className="h-4 w-4" />
        )}
      </Button>
      <Button variant="destructive" size="icon" onClick={onEndCall}>
        <PhoneOff className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VideoControls;