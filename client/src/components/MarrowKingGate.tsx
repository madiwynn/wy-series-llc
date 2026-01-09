import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MarrowKingGateProps {
  onUnlock: (key: string) => void;
  isUnlocked: boolean;
}

export default function MarrowKingGate({ onUnlock, isUnlocked }: MarrowKingGateProps) {
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isAttempting, setIsAttempting] = useState(false);

  const handleUnlock = () => {
    setIsAttempting(true);
    setError('');

    // Validate access key
    const validKeys = ['WY_SERIES_2042', 'MARROW_KING', 'WY_SERIES', '2042'];
    const isValid = validKeys.some(key => accessKey.toUpperCase().includes(key));

    if (isValid) {
      onUnlock(accessKey);
    } else {
      setError('Access denied. Garment protection active.');
      setIsAttempting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  if (isUnlocked) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wynnwillow-dark via-stone-color to-wynnwillow-dark opacity-95" />
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(249, 179, 132, 0.1) 0%, transparent 70%)'
      }} />

      {/* Gate content */}
      <div className="relative z-10 w-full max-w-2xl px-6 py-12 text-center">
        {/* Three Stone Triad Animation */}
        <div className="mb-12 flex justify-center gap-8 items-end">
          <div className="flex flex-col items-center animate-bounce" style={{ animationDelay: '0s' }}>
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-wynnwillow-accent to-wynnwillow-primary flex items-center justify-center mb-3 shadow-lg">
              <span className="text-2xl">🪨</span>
            </div>
            <div className="text-wynnwillow-accent font-bold text-sm">PAVLOV</div>
            <div className="text-wynnwillow-accent text-xs opacity-75">$19/mo</div>
          </div>

          <div className="flex flex-col items-center animate-bounce" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-wynnwillow-accent to-wynnwillow-primary flex items-center justify-center mb-3 shadow-lg">
              <span className="text-2xl">🪨</span>
            </div>
            <div className="text-wynnwillow-accent font-bold text-sm">FIRMAMENT</div>
            <div className="text-wynnwillow-accent text-xs opacity-75">$29/mo</div>
          </div>

          <div className="flex flex-col items-center animate-bounce" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-wynnwillow-accent to-wynnwillow-primary flex items-center justify-center mb-3 shadow-lg">
              <span className="text-2xl">🪨</span>
            </div>
            <div className="text-wynnwillow-accent font-bold text-sm">SOVEREIGNTY</div>
            <div className="text-wynnwillow-accent text-xs opacity-75">NEUTRALIZED</div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-7xl font-black mb-4 text-wynnwillow-accent tracking-tighter">
          WYNNWILLOW
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-wynnwillow-primary tracking-tight">
          CITYGATE
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-wynnwillow-accent opacity-90 mb-12 font-light">
          Three Stone Triad → Access Granted
        </p>

        {/* Access key input */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <input
              type="password"
              id="esim-key"
              placeholder="eSIM Access Key (WY_SERIES_2042)"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isAttempting}
              className="w-full px-6 py-4 bg-wynnwillow-dark/50 border-2 border-wynnwillow-accent rounded-lg text-wynnwillow-accent placeholder-wynnwillow-accent/50 focus:outline-none focus:border-wynnwillow-primary focus:ring-2 focus:ring-wynnwillow-primary/30 transition-all disabled:opacity-50"
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-wynnwillow-accent opacity-50 w-5 h-5" />
          </div>

          {error && (
            <div className="text-red-400 text-sm font-medium animate-pulse">
              {error}
            </div>
          )}
        </div>

        {/* Unlock button */}
        <Button
          onClick={handleUnlock}
          disabled={isAttempting || !accessKey}
          className="w-full py-4 px-8 bg-gradient-to-r from-wynnwillow-primary to-wynnwillow-accent hover:from-wynnwillow-accent hover:to-wynnwillow-primary text-wynnwillow-dark font-bold text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAttempting ? (
            <>
              <div className="w-5 h-5 border-2 border-wynnwillow-dark border-t-transparent rounded-full animate-spin" />
              Unlocking...
            </>
          ) : (
            <>
              <Unlock className="w-5 h-5" />
              ENTER 120SQFT THRONE
            </>
          )}
        </Button>

        {/* Footer text */}
        <p className="mt-12 text-wynnwillow-accent/60 text-xs uppercase tracking-widest">
          Garment Protected → Sovereignty Assured
        </p>
      </div>
    </div>
  );
}
