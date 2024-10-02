// app/page.tsx (or wherever your page file is located)

import React from "react";
import CreateRoom from "@/components/create-room";

const CreateRoomPage = () => {
  return (
    <div>
      <main className="flex justify-center flex-col items-center p-24">
        <div className="font-bold text-3xl">Create New Room</div>
        <div>

        <CreateRoom />
        </div>
      </main>
    </div>
  );
};

export default CreateRoomPage;
