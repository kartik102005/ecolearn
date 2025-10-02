import React, { useMemo, useState } from 'react';

export interface GameCompletionPayload {
  score: number;
  progress: number;
  ecoLevel: number;
  citizens: number;
  days: number;
}

export interface GameComponentProps {
  onClose: () => void;
  onComplete: (result: GameCompletionPayload) => void;
}

const defaultResult: GameCompletionPayload = {
  score: 420,
  progress: 65,
  ecoLevel: 3,
  citizens: 1200,
  days: 7
};

const scorePresets = [320, 420, 520, 640, 750];

const TakeCareOfResourcesGame: React.FC<GameComponentProps> = ({ onClose, onComplete }) => {
  const [result, setResult] = useState<GameCompletionPayload>(defaultResult);
  const [hasCompleted, setHasCompleted] = useState(false);

  const completionBadge = useMemo(() => {
    if (!hasCompleted) return 'Awaiting Mission Report';
    if (result.progress >= 90) return 'Resource Champion';
    if (result.progress >= 70) return 'Eco Guardian';
    return 'Sustainability Scout';
  }, [hasCompleted, result.progress]);

  const handleComplete = () => {
    onComplete(result);
    setHasCompleted(true);
  };

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-emerald-500/40 bg-gradient-to-r from-emerald-600/80 to-sky-600/80 px-6 py-4 shadow-lg">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-100/80">Interactive Eco Mission</p>
          <h2 className="text-2xl font-bold">Take Care of Resources</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            hasCompleted ? 'border-yellow-300/70 bg-yellow-300/20 text-yellow-100' : 'border-white/30 bg-white/10 text-emerald-100'
          }`}>
            {completionBadge}
          </span>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Close Game
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="grid flex-1 grid-cols-1 gap-6 overflow-hidden p-6 lg:grid-cols-[2fr_1fr]">
        <section className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-inner">
          <div className="border-b border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="text-lg font-semibold text-emerald-200">Mission Briefing</h3>
            <p className="mt-1 text-sm text-emerald-100/80">
              Patrol the virtual home and shut down anything wasting energy or water. Each resource you save adds to your Eco Impact score!
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: 'Tap the Drips',
                  detail: 'Locate dripping faucets and turn them off quickly.'
                },
                {
                  title: 'Lights Out',
                  detail: 'Switch off unused lights to conserve energy.'
                },
                {
                  title: 'Smart Appliances',
                  detail: 'Deactivate appliances when they are not needed.'
                },
                {
                  title: 'Track Efficiency',
                  detail: 'Monitor your Eco Impact meter to improve results.'
                }
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm">
                  <p className="font-semibold text-emerald-200">{item.title}</p>
                  <p className="text-emerald-100/70">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <iframe
              title="Take Care of Resources Game"
              src="https://ecokids.net/juegos/cuida-los-recursos/index.html"
              className="h-full w-full border-0"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-emerald-500/20"></div>
          </div>
        </section>

        {/* Mission Control */}
        <aside className="flex max-h-full flex-col gap-6 overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl">
          <div>
            <h3 className="text-lg font-semibold text-emerald-200">Mission Control</h3>
            <p className="text-sm text-emerald-100/70">Record your performance after each run to track improvements.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-emerald-100">
                Eco Impact Score
                <span className="text-base font-semibold text-emerald-300">{result.score}</span>
              </label>
              <input
                type="range"
                min={200}
                max={900}
                step={10}
                value={result.score}
                onChange={(event) => setResult((prev) => ({ ...prev, score: Number(event.target.value) }))}
                className="mt-2 w-full accent-emerald-400"
              />
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-emerald-100/70">
                {scorePresets.map((preset) => (
                  <button
                    key={preset}
                    className={`rounded-full border px-3 py-1 transition ${
                      result.score === preset ? 'border-emerald-300 bg-emerald-300/20 text-emerald-100' : 'border-white/20 hover:border-emerald-300/50'
                    }`}
                    onClick={() => setResult((prev) => ({ ...prev, score: preset }))}
                  >
                    {preset} pts
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between text-sm font-medium text-emerald-100">
                Mission Progress
                <span className="text-base font-semibold text-emerald-300">{result.progress}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={result.progress}
                onChange={(event) => setResult((prev) => ({ ...prev, progress: Number(event.target.value) }))}
                className="mt-2 w-full accent-emerald-400"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs uppercase tracking-widest text-emerald-100/60">Eco Level</p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <button
                    className="rounded-md bg-white/10 px-2 py-1 text-sm font-semibold text-white hover:bg-white/20"
                    onClick={() => setResult((prev) => ({ ...prev, ecoLevel: Math.max(1, prev.ecoLevel - 1) }))}
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-emerald-300">{result.ecoLevel}</span>
                  <button
                    className="rounded-md bg-white/10 px-2 py-1 text-sm font-semibold text-white hover:bg-white/20"
                    onClick={() => setResult((prev) => ({ ...prev, ecoLevel: Math.min(10, prev.ecoLevel + 1) }))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs uppercase tracking-widest text-emerald-100/60">Citizens Helped</p>
                <span className="mt-2 block text-2xl font-bold text-emerald-300">{result.citizens}</span>
                <div className="mt-2 flex justify-center gap-2">
                  {[200, 400, 800, 1200, 1600].map((citizens) => (
                    <button
                      key={citizens}
                      className={`rounded-full px-2 py-1 text-xs ${
                        result.citizens === citizens ? 'bg-emerald-300/20 text-emerald-200' : 'bg-white/10 text-emerald-100/70 hover:bg-white/20'
                      }`}
                      onClick={() => setResult((prev) => ({ ...prev, citizens }))}
                    >
                      {citizens}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs uppercase tracking-widest text-emerald-100/60">Days Simulated</p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <button
                    className="rounded-md bg-white/10 px-2 py-1 text-sm font-semibold text-white hover:bg-white/20"
                    onClick={() => setResult((prev) => ({ ...prev, days: Math.max(1, prev.days - 1) }))}
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-emerald-300">{result.days}</span>
                  <button
                    className="rounded-md bg-white/10 px-2 py-1 text-sm font-semibold text-white hover:bg-white/20"
                    onClick={() => setResult((prev) => ({ ...prev, days: Math.min(30, prev.days + 1) }))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <p className="text-sm text-emerald-100/80">
              When you finish a session, click <span className="font-semibold text-emerald-200">Record Mission Results</span> to log your best stats and update your dashboard progress.
            </p>
          </div>

          <div className="mt-auto space-y-3">
            {hasCompleted && (
              <div className="rounded-lg border border-yellow-300/40 bg-yellow-300/10 p-3 text-sm text-yellow-100">
                Mission results logged! You can keep playing to push your high score even further.
              </div>
            )}
            <button
              onClick={handleComplete}
              className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Record Mission Results
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TakeCareOfResourcesGame;
