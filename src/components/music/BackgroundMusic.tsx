"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import { weddingData } from "@/config/weddingData";
import { cn } from "@/utils/cn";
import { filledText } from "@/utils/text";

export type BackgroundMusicHandle = {
  playIfIntended: () => void;
};

type BackgroundMusicProps = {
  ref?: Ref<BackgroundMusicHandle>;
};

const MUSIC_VOLUME = 0.52;

function MusicNoteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.4 3.15c.32-.07.6.17.6.5v11.7a3.35 3.35 0 1 1-1.7-2.92V6.28L9.2 7.72a.48.48 0 0 0-.4.47v9.96a3.35 3.35 0 1 1-1.7-2.92V7.95c0-.22.14-.42.35-.48l8.95-2.32Z" />
    </svg>
  );
}

function startOffset(duration: number, requested: number): number {
  if (!Number.isFinite(requested) || requested <= 0) {
    return 0;
  }

  if (!Number.isFinite(duration) || duration <= 0) {
    return requested;
  }

  return Math.min(requested, Math.max(0, duration - 0.05));
}

export function BackgroundMusic({ ref }: BackgroundMusicProps) {
  const music = weddingData.music;
  const src = filledText(music.src);
  const label = filledText(music.label) ?? "Click Music";
  const playLabel = filledText(music.playLabel) ?? "Phát nhạc nền";
  const pauseLabel = filledText(music.pauseLabel) ?? "Tạm dừng nhạc nền";
  const discImage = filledText(music.discImage);
  const requestedStart = music.startAtSeconds;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intendedRef = useRef(true);
  const hasAppliedStartRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const applyStartOffset = useCallback(
    (audio: HTMLAudioElement) => {
      const offset = startOffset(audio.duration, requestedStart);
      if (!hasAppliedStartRef.current) {
        audio.currentTime = offset;
        hasAppliedStartRef.current = true;
        return;
      }

      if (audio.currentTime < offset - 0.25) {
        audio.currentTime = offset;
      }
    },
    [requestedStart],
  );

  const playIfIntended = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !intendedRef.current) {
      return;
    }

    audio.volume = MUSIC_VOLUME;
    audio.muted = false;

    if (audio.readyState >= 1) {
      applyStartOffset(audio);
    }

    void audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      });
  }, [applyStartOffset]);

  useImperativeHandle(ref, () => ({ playIfIntended }), [playIfIntended]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = MUSIC_VOLUME;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(!audio.paused && !audio.ended);
    const onLoadedMetadata = () => {
      applyStartOffset(audio);
      if (intendedRef.current) {
        playIfIntended();
      }
    };
    const onEnded = () => {
      audio.currentTime = startOffset(audio.duration, requestedStart);
      if (intendedRef.current) {
        playIfIntended();
      } else {
        setPlaying(false);
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    playIfIntended();

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [applyStartOffset, playIfIntended, requestedStart]);

  useEffect(() => {
    const unlock = (event: Event) => {
      if (!intendedRef.current) {
        return;
      }

      const target = event.target;
      if (target instanceof Element && target.closest("[data-music-toggle]")) {
        return;
      }

      playIfIntended();
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible" && intendedRef.current) {
        playIfIntended();
      }
    };

    window.addEventListener("pointerdown", unlock, true);
    window.addEventListener("keydown", unlock, true);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("keydown", unlock, true);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [playIfIntended]);

  function togglePlayback() {
    const audio = audioRef.current;
    intendedRef.current = !intendedRef.current;

    if (!audio) {
      setPlaying(false);
      return;
    }

    if (intendedRef.current) {
      playIfIntended();
      return;
    }

    audio.pause();
    setPlaying(false);
  }

  if (!src) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" playsInline />
      <button
        type="button"
        data-music-toggle=""
        onClick={togglePlayback}
        aria-pressed={playing}
        aria-label={playing ? pauseLabel : playLabel}
        className={cn(
          "fixed z-[10050] inline-flex h-11 items-center rounded-full",
          "right-[max(1.75rem,calc(env(safe-area-inset-right)+0.5rem))] bottom-[max(2.125rem,calc(env(safe-area-inset-bottom)+1rem))] sm:right-11 sm:bottom-11 lg:right-12 lg:bottom-12",
          "bg-accent-gold pl-3.5 pr-1 text-deep-forest",
          "shadow-[0_6px_14px_rgb(24_57_47/0.12)]",
          "touch-manipulation select-none",
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:opacity-95 active:scale-[0.98]",
          "focus-visible:outline-offset-4",
        )}
      >
        <span className="font-display text-[0.625rem] font-medium tracking-[0.16em] uppercase [margin-inline-end:0]">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="relative ml-2 size-10 overflow-hidden rounded-full shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--gold-foil)_55%,transparent)]"
        >
          <span className="music-note-spin absolute inset-0">
            {discImage ? (
              <img
                src={discImage}
                alt=""
                className="size-full object-cover object-[center_40%]"
              />
            ) : (
              <span className="absolute inset-0 bg-deep-forest" />
            )}
            <span className="absolute inset-0 bg-[radial-gradient(circle,rgb(24_57_47/0.5)_0%,rgb(24_57_47/0.16)_52%,transparent_74%)]" />
            <span className="absolute inset-0 grid place-items-center text-accent-gold">
              <MusicNoteMark className="size-3.5 drop-shadow-[0_1px_1px_rgb(24_57_47/0.45)]" />
            </span>
          </span>
        </span>
      </button>
    </>
  );
}
