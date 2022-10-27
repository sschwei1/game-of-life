import React, { useCallback } from "react";
import {IoAdd, IoRemove} from "react-icons/all";

interface SpeedSelectorProps {
  handleUpdateSpeed: (newVal: number) => void;
  speed: number;
}

const SpeedSelector = ({handleUpdateSpeed, speed}: SpeedSelectorProps) => {
  const handleSpeedChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleUpdateSpeed(Number(value));
    }, [handleUpdateSpeed]);

  const handleSpeedUp = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const newVal = speed + 100;
    handleUpdateSpeed(newVal);
    }, [handleUpdateSpeed, speed]);

  const handleSpeedDown = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const newVal = speed - 100;
    handleUpdateSpeed(newVal);
    }, [handleUpdateSpeed, speed]);

  return (
    <div className='speed-selector'>
      <button onClick={handleSpeedUp}><IoAdd /></button>
      <input
        value={speed}
        onChange={handleSpeedChange}
      />
      <button onClick={handleSpeedDown}><IoRemove /></button>
    </div>
  );
}

export default SpeedSelector;