import Peer from 'peerjs';

export class WebRTCManager {
  private peer: Peer | null = null;
  private stream: MediaStream | null = null;

  async initialize(userId: string) {
    this.peer = new Peer(userId);
    
    this.peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
    });

    this.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.stream = stream;
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            // Display remote stream in your UI
            this.displayStream(remoteStream, 'remote-video');
          });
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });
  }

  async call(remotePeerId: string) {
    if (!this.peer) {
      throw new Error('Peer not initialized');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.stream = stream;
      this.displayStream(stream, 'local-video');

      const call = this.peer.call(remotePeerId, stream);
      call.on('stream', (remoteStream) => {
        this.displayStream(remoteStream, 'remote-video');
      });
    } catch (err) {
      console.error('Failed to get local stream', err);
    }
  }

  private displayStream(stream: MediaStream, elementId: string) {
    const video = document.getElementById(elementId) as HTMLVideoElement;
    if (video) {
      video.srcObject = stream;
      video.onloadedmetadata = () => video.play();
    }
  }

  disconnect() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    if (this.peer) {
      this.peer.destroy();
    }
  }
}