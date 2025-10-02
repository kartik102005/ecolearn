import React, { useState } from 'react';

const ecoGames = [
  {
    title: 'Guardians of the Planet',
    image: 'https://ecokids.net/wp-content/uploads/pic-guardianes.webp',
    description: 'Team up with friends to defend the planet and restore balance.',
    link: 'https://ecokids.net/guardians-of-the-planet/'
  },
  {
    title: 'Recycle and Learn',
    image: 'https://ecokids.net/wp-content/uploads/2023/08/reciclaje-2.jpg',
    description: 'Sort recyclable materials correctly to keep the city spotless.',
    link: 'https://ecokids.net/recycle-and-learn/'
  },
  {
    title: "Run, it's Dripping!",
    image: 'https://ecokids.net/wp-content/uploads/2023/08/caminito-1.jpg',
    description: 'Race through the maze to close leaky taps before water is wasted.',
    link: 'https://ecokids.net/run-its-dripping/'
  },
  {
    title: "Let's Recover the Forest",
    image: 'https://ecokids.net/wp-content/uploads/2023/08/deforestacion-1.jpg',
    description: 'Replant trees and bring wildlife back to their natural homes.',
    link: 'https://ecokids.net/lets-recover-the-forest/'
  }
];

const ecoArticles = [
  {
    title: 'Discover How to Prevent Pollution of the Planet',
    image: 'https://ecokids.net/wp-content/uploads/contaminacion-1.webp',
    link: 'https://ecokids.net/discover-how-to-prevent-pollution-of-the-planet/'
  },
  {
    title: 'Energy Journey to the Future: Discovering Renewable Energy',
    image: 'https://ecokids.net/wp-content/uploads/energias-renovables.webp',
    link: 'https://ecokids.net/energy-journey-to-the-future-discovering-renewable-energy/'
  },
  {
    title: "Goodbye Plastic: Let's Learn to Reduce Its Use",
    image: 'https://ecokids.net/wp-content/uploads/plasticos.webp',
    link: 'https://ecokids.net/goodbye-plastic-lets-learn-to-reduce-its-use-and-take-care-of-the-planet/'
  },
  {
    title: 'The Importance of Taking Care of Our Forests',
    image: 'https://ecokids.net/wp-content/uploads/deforestacion.webp',
    link: 'https://ecokids.net/the-importance-of-taking-care-of-our-forests/'
  }
];

const Games: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleStartGame = () => {
    setIsPlaying(true);
  };

  const handleStopGame = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-emerald-50 text-slate-800">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10">
        <section className="space-y-6">
          <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-xl">
            <div className="mb-6 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500">Eco Game Spotlight</p>
                <h2 className="text-3xl font-bold text-emerald-700">Take Care of Resources</h2>
                <p className="mt-1 text-sm text-emerald-600">
                  Patrol the EcoKids home, shut down wasteful appliances, and earn your Eco Impact score.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600">
                <span className="material-symbols-outlined text-base text-emerald-500">bolt</span>
                Best for Ages 7–12
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-[1.6fr_1fr]">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 shadow-inner">
                <div className="flex items-center gap-4">
                  <img
                    src="https://ecokids.net/wp-content/uploads/2023/08/cuidado-recursos-3.jpg"
                    alt="Take Care of Resources preview"
                    className="h-24 w-28 flex-shrink-0 rounded-2xl border border-emerald-100 object-cover shadow-sm"
                  />
                  <div className="space-y-2 text-sm text-emerald-600">
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-emerald-500">check_circle</span>
                      Turn off dripping taps, unused lights, and idle appliances.
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-emerald-500">check_circle</span>
                      Earn Eco Impact points for every smart choice you make.
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-emerald-500">check_circle</span>
                      Learn how everyday actions keep the planet healthy.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-center">
                      <p className="text-[0.7rem] uppercase tracking-widest text-emerald-500">Duration</p>
                      <p className="text-base font-semibold text-emerald-700">10–15 mins</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-center">
                      <p className="text-[0.7rem] uppercase tracking-widest text-emerald-500">Mode</p>
                      <p className="text-base font-semibold text-emerald-700">Single Player</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleStartGame}
                      className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-400/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                        isPlaying
                          ? 'bg-emerald-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:brightness-110'
                      }`}
                      disabled={isPlaying}
                    >
                      <span className="material-symbols-outlined text-base">play_arrow</span>
                      {isPlaying ? 'Game Running' : 'Play Game'}
                    </button>
                    {isPlaying && (
                      <button
                        onClick={handleStopGame}
                        className="flex items-center gap-2 rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                      >
                        <span className="material-symbols-outlined text-base">stop_circle</span>
                        Stop
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex h-full flex-col justify-between gap-3 rounded-2xl border border-emerald-100 bg-white p-5 text-sm text-emerald-600 shadow-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">Game Goals</p>
                  <p className="mt-2 leading-relaxed text-slate-600">
                    Help children understand why saving water and electricity matters, starting with everyday choices at home.
                    Encourage mindful habits that keep our planet thriving.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                  <p className="text-xs uppercase tracking-widest text-emerald-500">Best Tip</p>
                  <p className="mt-1 text-sm text-emerald-600">
                    {isPlaying
                      ? 'Switch to full screen for the best experience and make sure your sound is on.'
                      : 'Click “Play Game” to explore the EcoKids home and spot hidden resource leaks.'}
                  </p>
                </div>
              </div>
            </div>

            {isPlaying && (
              <div className="mt-6 overflow-hidden rounded-3xl border border-emerald-100 shadow-inner">
                <iframe
                  title="Take Care of Resources Game"
                  src="https://ecokids.net/juegos/cuida-los-recursos/index.html"
                  className="h-[480px] w-full border-0"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Games;