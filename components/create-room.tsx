// components/CreateRoom.tsx

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Copy, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roomCreateId, setRoomCreateId] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const handleCreateRoom = async () => {
    if (!roomName) {
      toast({
        title: "Error",
        description: "Please enter a room name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/room", {
        name: roomName,
        creatorId: session?.user?.id,
      });
      const room = response.data;
      setRoomCreateId(room.id);
      const newRoomLink = `${window.location.origin}/room/${room.id}`;
      setRoomId(newRoomLink);
      toast({
        title: "Success",
        description: "Room created successfully. Share the link with others!",
      });
    } catch (error) {
      console.error("Error creating room:", error);
      toast({
        title: "Error",
        description: "Failed to create room",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomId);
    toast({
      title: "Copied",
      description: "Room link copied to clipboard",
    });
  };

  const handleJoinNow = () => {
    router.push(`/room/${roomCreateId}`);
  };

  return (
    <main className="p-12">
      {/* <Button className="flex">
        Create Room
      </Button> */}

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create a New Room</CardTitle>
          <CardDescription>
            Set up a video call room and share the link with anyone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="roomName"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <Button
            onClick={handleCreateRoom}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Room{" "}
              </>
            ) : (
              "Create Room"
            )}
          </Button>
          {roomId && (
            <>
              <div className="flex w-full items-center space-x-2 p-4">
                <Input value={roomCreateId} readOnly className="flex-grow" />
                <Button size="icon" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={handleJoinNow} className="w-full">
                Join Now
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </main>
  );
};

export default CreateRoom;
