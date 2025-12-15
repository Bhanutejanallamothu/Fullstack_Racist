'use client';
import { useRef, useState } from 'react';
import InfiniteMenu from '@/components/InfiniteMenu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const items = PlaceHolderImages.map((img, i) => ({
  image: img.imageUrl,
  link: img.imageUrl,
  title: '',
  description: '',
}));

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
      if (!audioRef.current.muted && audioRef.current.paused) {
        audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
      }
    }
  };

  return (
    <main className="w-screen h-screen bg-background text-foreground">
      <div className="w-full h-full relative">
        <InfiniteMenu items={items} />
      </div>
      <audio
        ref={audioRef}
        autoPlay
        loop
        onPlay={() => setIsMuted(false)}
        onPause={() => {
            if(audioRef.current && !audioRef.current.muted) {
                setIsMuted(true)
            }
        }}
      >
        <source
          src="https://ik.imagekit.io/bhanuteja110/New%20folder/Oggy%20and%20the%20Cockroaches%20-%20ALL%20OPENINGS%20_%201998%20-%202018%20low.mp3"
          type="audio/mpeg"
        />
      </audio>
      <Button
        onClick={toggleMute}
        variant="ghost"
        size="icon"
        className="absolute bottom-4 right-4 z-20 bg-primary/50 hover:bg-primary text-primary-foreground"
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
        <span className="sr-only">Toggle sound</span>
      </Button>
    </main>
  );
}
