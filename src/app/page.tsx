'use client';
import { useRef, useState, useEffect } from 'react';
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

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Attempt to play, browsers might block this if not muted.
      audio.play().catch((error) => {
        console.warn("Audio autoplay was prevented:", error);
        // If autoplay is blocked, we should reflect the muted state.
        if (!audio.paused) {
          audio.muted = true;
          setIsMuted(true);
        } else if(audio.muted) {
           setIsMuted(true);
        } else {
           setIsMuted(false)
        }
      });
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      const newMutedState = !audio.muted;
      audio.muted = newMutedState;
      setIsMuted(newMutedState);
      // If we are unmuting and it's paused, play it.
      if (!newMutedState && audio.paused) {
        audio.play().catch((e) => console.error("Audio play failed:", e));
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
        muted={false}
        onPlay={() => setIsMuted(audioRef.current?.muted ?? false)}
        onPause={() => {
            if(audioRef.current && !audioRef.current.muted) {
                // This case can happen if the browser pauses audio when the tab is hidden
                // We don't want to change the icon in this case
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
