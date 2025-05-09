import React from "react";
import {IoAdd, IoRemove} from "react-icons/all";
import {RangeValue} from "../Game";

interface SpeedSelectorProps {
  handleUpdateSpeed: (newVal: number) => void;
  speed: RangeValue;
}

const SpeedSelector = ({handleUpdateSpeed, speed}: SpeedSelectorProps) => {
  const updateSpeed = (newVal: number) => {
    if(isNaN(newVal)) {
      newVal = speed.default;
    } else if(newVal < speed.min) {
      newVal = speed.min;
    } else if(newVal > speed.max) {
      newVal = speed.max;
    }

    handleUpdateSpeed(newVal);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    updateSpeed(value);
  };

  const handleSpeedUp = () => {
    const newVal = speed.value + 100;
    updateSpeed(newVal);
  };

  const handleSpeedDown = () => {
    const newVal = speed.value - 100;
    updateSpeed(newVal);
  };

  return (
    <div className='speed-selector'>
      <button
        disabled={speed.value === speed.min}
        onClick={handleSpeedDown}
      >
        <IoRemove />
      </button>
      <input
        value={speed.value}
        onChange={handleSpeedChange}
      />
      <button
        disabled={speed.value === speed.max}
        onClick={handleSpeedUp}
      >
        <IoAdd />
      </button>
    </div>
  );
}

export default SpeedSelector;