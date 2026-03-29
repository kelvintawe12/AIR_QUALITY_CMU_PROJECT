import { useRef, useCallback, useEffect } from 'react';

export function useAlertSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPlayingRef = useRef(false);

  const playBeep = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create a two-tone alarm beep
      const now = ctx.currentTime;

      // First tone (higher pitch)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain1.gain.linearRampToValueAtTime(0.3, now + 0.12);
      gain1.gain.linearRampToValueAtTime(0, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Second tone (lower pitch, slight delay)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(660, now + 0.18);
      gain2.gain.setValueAtTime(0, now + 0.18);
      gain2.gain.linearRampToValueAtTime(0.25, now + 0.2);
      gain2.gain.linearRampToValueAtTime(0.25, now + 0.3);
      gain2.gain.linearRampToValueAtTime(0, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.35);
    } catch (e) {

      // Web Audio API not available — fail silently
    }}, []);

  const startAlarm = useCallback(() => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    playBeep();
    intervalRef.current = setInterval(playBeep, 2000);
  }, [playBeep]);

  const stopAlarm = useCallback(() => {
    isPlayingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopAlarm();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAlarm]);

  return { startAlarm, stopAlarm, isPlaying: isPlayingRef };
}