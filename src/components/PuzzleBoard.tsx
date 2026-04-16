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
  // Phrase: YOURE MY ONE IN 8 BILLION
  // Indices: 0-4 (SPACE) 5-6 (NEWLINE/SPACE) 7-9 (SPACE) 10-11 (SPACE) 12 (NEWLINE/SPACE) 13-19

  const getMarginClass = (index: number) => {
    if ([4, 6, 9, 11, 12].includes(index)) {
      return "mr-4 sm:mr-8 md:mr-12";
    }
    return "";
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto px-4">
      {slots.map((slot, index) => (
        <React.Fragment key={index}>
          {index === 3 && (
            <div className="flex items-end justify-center pb-1 sm:pb-2 text-white text-4xl sm:text-5xl font-extrabold mx-1 drop-shadow-sm">
              '
            </div>
          )}
          <div className={`flex ${getMarginClass(index)}`}>
            <LetterBox
              index={index}
              letter={slot.letter}
              status={slot.status}
              isActive={index === activeSlotIndex}
              onClick={() => onSlotClick(index)}
              onDrop={(letter) => onSlotDrop(index, letter)}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
