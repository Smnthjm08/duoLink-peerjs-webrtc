// app/room/[id]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSocket } from "@/context/SocketContext";
import usePeer from "@/hooks/usePeer";
import useMediaStream from '@/hooks/useMediaStream';
import Player from '@/components/video-input';
import { useParams } from 'next/navigation';
import axios from 'axios';
import usePlayer from '@/hooks/usePlayer';

interface RoomData {
  name: string;
}

const RoomPage: React.FC = () => {
  const { socket } = useSocket();
  const params = useParams();
  const roomId = params.id as string;
  const { peer, myId } = usePeer({ roomId });
  const { stream } = useMediaStream();
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const { players, addPlayer, removePlayer } = usePlayer();

  async function fetchRoomData(roomId: string) {
    try {
      const response = await axios.get(`/api/room/${roomId}`);
      const data = response.data;
      setRoomData(data);
      console.log("Room data fetched:", data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }

  useEffect(() => {
    if (roomId) {
      fetchRoomData(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleUserConnected = (newUserId: string) => {
      console.log(`New user connected in room with userId ${newUserId}`);

      const call = peer.call(newUserId, stream);
      call.on("stream", (incomingStream: MediaStream) => {
        console.log(`Incoming stream from ${newUserId}`);
        addPlayer(newUserId, incomingStream);
      });
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream, addPlayer]);

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on("call", (call) => {
      const callerID = call.peer;
      call.answer(stream);

      console.log("Call answered from:", callerID);

      call.on("stream", (incomingStream: MediaStream) => {
        console.log(`Incoming stream from ${callerID}`);
        addPlayer(callerID, incomingStream);
      });
    });
  }, [peer, stream, addPlayer]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`Setting my stream to ${myId}`);
    addPlayer(myId, stream);
  }, [stream, myId, addPlayer]);

  if (!roomData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1>Welcome to Room: {roomId} Name: {roomData.name}</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(players).map(([playerId, { url, muted, playing }]) => (
          <Player key={playerId} url={url} muted={muted} playing={playing} playerId={playerId} />
        ))}
      </div>
    </main>
  );
};

export default RoomPage;