// hooks/usePlayer.ts
import { useState, useCallback } from "react";

interface Player {
  url: MediaStream;
  muted: boolean;
  playing: boolean;
}

const usePlayer = () => {
  const [players, setPlayers] = useState<Record<string, Player>>({});

  const addPlayer = useCallback((peerId: string, stream: MediaStream) => {
    setPlayers((prev) => ({
      ...prev,
      [peerId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
    console.log(`Player added: ${peerId}`);
  }, []);

  const removePlayer = useCallback((peerId: string) => {
    setPlayers((prev) => {
      const newPlayers = { ...prev };
      delete newPlayers[peerId];
      return newPlayers;
    });
    console.log(`Player removed: ${peerId}`);
  }, []);


  return { players, addPlayer, removePlayer };
};

export default usePlayer;