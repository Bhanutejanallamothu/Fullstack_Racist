import InfiniteMenu from '@/components/InfiniteMenu';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const items = PlaceHolderImages.map((img, i) => ({
  image: img.imageUrl,
  link: img.imageUrl,
  title: '',
  description: ''
}));

export default function Home() {
  return (
    <main className="w-screen h-screen bg-background text-foreground">
      <div className="w-full h-full relative">
        <InfiniteMenu items={items}/>
      </div>
      <audio autoPlay loop>
        <source src="https://ik.imagekit.io/bhanuteja110/New%20folder/Oggy%20and%20the%20Cockroaches%20-%20ALL%20OPENINGS%20_%201998%20-%202018%20low.mp3" type="audio/mpeg" />
      </audio>
    </main>
  );
}
