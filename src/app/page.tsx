import InfiniteMenu from '@/components/InfiniteMenu';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const items = PlaceHolderImages.map((img, i) => ({
  image: img.imageUrl,
  link: 'https://google.com/',
  title: '',
  description: ''
}));

export default function Home() {
  return (
    <main className="w-screen h-screen bg-background text-foreground">
      <div className="w-full h-full relative">
        <InfiniteMenu items={items}/>
      </div>
    </main>
  );
}
