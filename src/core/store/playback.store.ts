// core/store/playback.store.ts
// Zustand store for playback control, RAF loop, and speed management.

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface PlaybackState {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number; // 0.25 -> 4
  _rafId: number | null;
  _lastTs: number | null;
  _accMs: number;
}

interface PlaybackActions {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  stepForward: () => void;
  stepBack: () => void;
  scrubTo: (step: number) => void;
  setSpeed: (speed: number) => void;
  setTotalSteps: (total: number) => void;
  reset: () => void;
}

const MS_PER_STEP = 700;

export const usePlaybackStore = create<PlaybackState & PlaybackActions>()(
  immer((set, get) => ({
    currentStep: 0,
    totalSteps: 0,
    isPlaying: false,
    speed: 1,
    _rafId: null,
    _lastTs: null,
    _accMs: 0,

    play: () => {
      const state = get();
      if (state.isPlaying || state.currentStep >= state.totalSteps - 1) return;

      set((s) => {
        s.isPlaying = true;
        s._lastTs = null;
        s._accMs = 0;
      });

      const tick = (now: DOMHighResTimeStamp) => {
        const s = get();
        if (!s.isPlaying) return;

        const delta = s._lastTs === null ? 0 : now - s._lastTs;
        const acc = s._accMs + delta;
        const interval = MS_PER_STEP / s.speed;

        if (acc >= interval) {
          const nextStep = s.currentStep + 1;
          if (nextStep >= s.totalSteps) {
            set((st) => {
              st.isPlaying = false;
              st._rafId = null;
            });
            return;
          }

          set((st) => {
            st.currentStep = nextStep;
            st._accMs = acc % interval;
            st._lastTs = now;
          });
        } else {
          set((st) => {
            st._accMs = acc;
            st._lastTs = now;
          });
        }

        const id = requestAnimationFrame(tick);
        set((st) => {
          st._rafId = id;
        });
      };

      const id = requestAnimationFrame(tick);
      set((s) => {
        s._rafId = id;
      });
    },

    pause: () => {
      const { _rafId } = get();
      if (_rafId !== null) {
        cancelAnimationFrame(_rafId);
      }
      set((s) => {
        s.isPlaying = false;
        s._rafId = null;
      });
    },

    togglePlay: () => {
      const { isPlaying, play, pause } = get();
      if (isPlaying) pause();
      else play();
    },

    stepForward: () => {
      set((s) => {
        s.currentStep = Math.min(s.currentStep + 1, s.totalSteps - 1);
      });
    },

    stepBack: () => {
      set((s) => {
        s.currentStep = Math.max(s.currentStep - 1, 0);
      });
    },

    scrubTo: (step: number) => {
      get().pause();
      set((s) => {
        s.currentStep = step;
        s._accMs = 0;
      });
    },

    setSpeed: (speed: number) => {
      set((s) => {
        s.speed = speed;
      });
    },

    setTotalSteps: (total: number) => {
      set((s) => {
        s.totalSteps = total;
      });
    },

    reset: () => {
      get().pause();
      set((s) => {
        s.currentStep = 0;
        s._accMs = 0;
        s._lastTs = null;
      });
    },
  }))
);
