import React from 'react';
import { LetterBox, type BoxStatus } from './LetterBox';

export interface SlotData {
  id: string | null;
  letter: string | null;
  status: BoxStatus;
}

interface PuzzleBoardProps {
  slots: SlotData[];
  activeSlotIndex: number | null;
  onSlotClick: (index: number) => void;
  onSlotDrop: (index: number, letter: string) => void;
}

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ slots, activeSlotIndex, onSlotClick, onSlotDrop }) => {
  // Phrase: YOU'RE MY ONE IN 8 BILLION
  // Grouping into words so they don't break mid-word on small screens
  const words = [
    [0, 1, 2, 'apo', 3, 4], // YOU'RE
    [5, 6],                 // MY
    [7, 8, 9],              // ONE
    [10, 11],               // IN
    [12],                   // 8
    [13, 14, 15, 16, 17, 18, 19] // BILLION
  ];

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-6 max-w-4xl mx-auto px-1 sm:px-4">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex gap-1 sm:gap-2">
          {word.map((item, itemIndex) => {
            if (item === 'apo') {
              return (
                <div key="apo" className="flex items-end justify-center pb-1 sm:pb-2 text-white text-3xl sm:text-5xl font-extrabold mx-0.5 sm:mx-1 drop-shadow-sm">
                  '
                </div>
              );
            }
            
            const index = item as number;
            const slot = slots[index];
            if (!slot) return null;

            return (
              <LetterBox
                key={index}
                index={index}
                letter={slot.letter}
                status={slot.status}
                isActive={index === activeSlotIndex}
                onClick={() => onSlotClick(index)}
                onDrop={(letter) => onSlotDrop(index, letter)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
