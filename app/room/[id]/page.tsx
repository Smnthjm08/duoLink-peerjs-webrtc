"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSocket } from "@/context/SocketContext";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/video-input";
import { useParams, } from "next/navigation";
import axios from "axios";
import usePlayer from "@/hooks/usePlayer";
import VideoControls from "@/components/video-controller";


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

  const fetchRoomData = useCallback(async (roomId: string) => {
    try {
      const response = await axios.get(`/api/room/${roomId}`);
      const data = response.data;
      setRoomData(data);
      console.log("Room data fetched:", data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  useEffect(() => {
    if (roomId) {
      fetchRoomData(roomId);
    }
  }, [roomId, fetchRoomData]);

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

    const handleIncomingCall = (call: any) => {
      const callerID = call.peer;
      call.answer(stream);

      console.log("Call answered from:", callerID);

      call.on("stream", (incomingStream: MediaStream) => {
        console.log(`Incoming stream from ${callerID}`);
        addPlayer(callerID, incomingStream);
      });
    };

    peer.on("call", handleIncomingCall);

    return () => {
      peer.off("call", handleIncomingCall);
    };
  }, [peer, stream, addPlayer]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`Setting my stream to ${myId}`);
    addPlayer(myId, stream);
  }, [stream, myId, addPlayer]);

  useEffect(() => {
    if (!socket) return;

    const handleUserDisconnected = (userId: string) => {
      console.log(`User disconnected: ${userId}`);
      removePlayer(userId);
    };

    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, [socket, removePlayer]);

  if (!roomData) {
    return <div>Loading...</div>;
  }

  const playerEntries = Object.entries(players);
  const otherPlayerEntry = playerEntries.find(
    ([playerId]) => playerId !== myId
  );
  const myPlayerEntry = playerEntries.find(([playerId]) => playerId === myId);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen pb-28 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Room: {roomId} - {roomData.name}
      </h1>
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4">
        <div className="relative w-full h-full">
          {otherPlayerEntry && (
            <div className="z-10 w-full h-full">
              <Player
                key={otherPlayerEntry[0]}
                url={otherPlayerEntry[1].url}
                muted={otherPlayerEntry[1].muted}
                playing={otherPlayerEntry[1].playing}
                playerId={otherPlayerEntry[0]}
              />
            </div>
          )}

          {myPlayerEntry && (
            <div className="absolute bottom-4 right-4 w-36 h-auto z-5 border-2 border-white rounded-lg overflow-hidden">
              <Player
                key={myPlayerEntry[0]}
                url={myPlayerEntry[1].url}
                muted={myPlayerEntry[1].muted}
                playing={myPlayerEntry[1].playing}
                playerId={myPlayerEntry[0]}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default RoomPage;
