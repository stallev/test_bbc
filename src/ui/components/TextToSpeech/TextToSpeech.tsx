'use client';

import React, { useState, useEffect } from 'react';
import { IoStopCircle, IoPlay } from 'react-icons/io5';
import { PiPauseCircleFill } from 'react-icons/pi';

import { useLocale } from '@/hooks/useLocale';
import { stripHtmlTags } from '@/utils/stripHtmlTags';

import styles from './styles/text-to-speech.module.scss';
import { TextToSpeechProps } from './types';

const TextToSpeech: React.FC<TextToSpeechProps> = ({ data }) => {
  const locale = useLocale();

  const [isPaused, setIsPaused] = useState(false);
  const [isOnStart, setIsOnStart] = useState(true);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const textForSpeechGenerating = stripHtmlTags(data);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (utterance) {
      if (isPaused) {
        synth.resume();
      }
      synth.speak(utterance);
    }

    setIsOnStart(false);
    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();

    setIsPaused(false);
    setIsOnStart(true);
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(textForSpeechGenerating);
    if (locale) {
      u.lang = locale;
    }

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [textForSpeechGenerating, locale]);

  return (
    <div className={styles['text-to-speech']}>
      <div className={styles['text-to-speech__audio-buttons-list']}>
        <button
          className={styles['text-to-speech__audio-button']}
          onClick={isPaused || isOnStart ? handlePlay : handlePause}
          tabIndex={0}
          aria-label={isPaused ? 'Resume' : 'Play'}
        >
          {isPaused || isOnStart ? <IoPlay /> : <PiPauseCircleFill />}
        </button>

        <button
          className={styles['text-to-speech__audio-button']}
          onClick={handleStop}
          tabIndex={0}
          aria-label="Stop"
        >
          <IoStopCircle />
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
