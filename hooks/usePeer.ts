// hooks/usePeer.ts
"use client"

import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSocket } from "@/context/SocketContext";

interface UsePeerProps {
  roomId: string | null;
}

const usePeer = ({ roomId }: UsePeerProps) => {
  const { socket } = useSocket();
  const [peer, setPeer] = useState<Peer | null>(null);
  const [myId, setMyId] = useState<string>("");
  const isPeerSet = useRef(false);

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;

    const initPeer = async () => {
      const PeerModule = await import("peerjs");
      const myPeer = new PeerModule.default();
      setPeer(myPeer);

      myPeer.on("open", (id) => {
        console.log(`Your peer ID is: ${id}`);
        setMyId(id);
        socket.emit("join-room", roomId, id);
      });
    };

    initPeer();

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [roomId, socket]);

  return { peer, myId };
};

export default usePeer;