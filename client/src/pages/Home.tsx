import { useState, useEffect } from 'react';
import MarrowKingGate from '@/components/MarrowKingGate';
import ESIMProbe from './ESIMProbe';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessKey, setAccessKey] = useState('');

  // Check if user has been granted access in this session
  useEffect(() => {
    const storedAccess = sessionStorage.getItem('wynnwillow_access');
    if (storedAccess) {
      setIsUnlocked(true);
      setAccessKey(storedAccess);
    }
  }, []);

  const handleUnlock = (key: string) => {
    // Store access in session storage
    sessionStorage.setItem('wynnwillow_access', key);
    setAccessKey(key);
    setIsUnlocked(true);
  };

  return (
    <div>
      <MarrowKingGate onUnlock={handleUnlock} isUnlocked={isUnlocked} />
      {isUnlocked && <ESIMProbe />}
    </div>
  );
}
