'use client';
import { useEffect } from 'react';
import EmblaCarousel from './EmblaCarrousel';
import { EmblaOptionsType } from 'embla-carousel'

export default function DevPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  useEffect(() => {
    const fetchData = async () => {
      const data = await params;
      console.log('Fetched params:', data);
    };

    fetchData();
  }, [params]);

    const OPTIONS: EmblaOptionsType = { loop: true }


  return (
    <main >
      <section>
        <div className="initial relative">
          <img className="block m-auto w-200" src="_R5_1802.jpg" />
          <div>
            <h1 className="absolute inset-0 flex items-start justify-center pt-26 text-4xl font-bold text-white">
               Grecia & Fernando
            </h1>
          </div>
        </div>
        <div className="p-10">
          <EmblaCarousel options={OPTIONS} />
        </div>
      </section>
    </main>
  );
}