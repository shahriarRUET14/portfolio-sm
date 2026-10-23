import About from '@/components/home/About';
import Approach from '@/components/home/Approach';
import Contact from '@/components/home/Contact';
import Expertise from '@/components/home/Expertise';
import Hero from '@/components/home/Hero';
import SelectedWork from '@/components/home/SelectedWork';
import TrackRecord from '@/components/home/TrackRecord';
import JsonLd from '@/components/seo/JsonLd';
import { homeSchema } from '@/lib/structured-data';

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <Hero />
      <TrackRecord />
      <SelectedWork />
      <Approach />
      <Expertise />
      <About />
      <Contact />
    </>
  );
}
