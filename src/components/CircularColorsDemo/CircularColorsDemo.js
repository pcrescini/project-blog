'use client';
import React from 'react';
import clsx from 'clsx';
import { LayoutGroup, motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeElapsed((currentTime) => currentTime + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPlaying, timeElapsed]);

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const colorIndex = timeElapsed % COLORS.length;
  const selectedColor = COLORS[colorIndex];

  const id = React.useId();

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layoutId={id}
                    className={styles.selectedColorOutline}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 40,
                    }}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox,
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause /> : <Play />}
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setTimeElapsed(0);
              }}
            >
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </LayoutGroup>
  );
}

export default CircularColorsDemo;
