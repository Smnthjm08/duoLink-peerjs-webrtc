"use client"

import React from 'react';
import SimpleVideoInput from '@/components/video-input';

const VideoCallPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <SimpleVideoInput />
    </main>
  );
};

export default VideoCallPage;
