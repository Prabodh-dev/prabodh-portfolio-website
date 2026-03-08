'use client';

export default function GameLoader() {
  return (
    <div className="min-h-screen retro-grid flex items-center justify-center relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/2 to-white/5 animate-pulse"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Pixelated loading bar */}
        <div className="relative">
          {/* Outer container with neon border */}
          <div className="neon-box p-8 bg-retro-darker/90 backdrop-blur">
            {/* Loading text with glitch effect */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wider neon-text text-center mb-2 animate-pulse">
                {'>'} LOADING...
              </h2>
              <p className="text-white/80 font-mono text-sm text-center">
                {'['} Initializing Ghost System {']'}
              </p>
            </div>

            {/* Progress bar container */}
            <div className="w-80 h-8 bg-retro-gray border-2 border-white/20 relative overflow-hidden">
              {/* Animated progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-ghost-glow to-white/90 animate-loading-bar"></div>
              
              {/* Pixel effect overlay */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
              }}></div>
            </div>

            {/* Percentage counter */}
            <div className="mt-4 flex justify-center gap-2">
              <span className="text-white font-mono text-sm animate-pulse">{'['}</span>
              <span className="text-white/80 font-mono text-sm font-bold animate-counter">
                Loading Assets
              </span>
              <span className="text-white font-mono text-sm animate-pulse">{']'}</span>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white/40"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-ghost-glow"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-ghost-glow"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white/40"></div>
        </div>

        {/* Spinning game controller icon */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-white/40 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-ghost-glow border-b-white rounded-full animate-spin-slow"></div>
        </div>

        {/* Status dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-ghost-glow rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Bottom text */}
        <p className="text-white/80 font-mono text-xs uppercase tracking-widest">
          {'>'} Press any key to continue...
        </p>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 scanlines pointer-events-none"></div>
    </div>
  );
}
