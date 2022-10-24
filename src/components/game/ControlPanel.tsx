import {ButtonDefinition, ButtonGroup} from '../button';
import {
  AiOutlineClear,
  BsFillPlayFill,
  BsFillStopFill,
  CiSettings,
  IoAdd,
  IoRemove,
  TbArrowsRandom
} from 'react-icons/all';
import React, {useCallback, useMemo} from 'react';
import {GameOptions, GameState} from './Game';

interface ControlPanelProps {
  gameOptions: GameOptions;
  handleStart: React.MouseEventHandler<HTMLButtonElement>;
  handleStop: React.MouseEventHandler<HTMLButtonElement>;
  handleRandomFill: React.MouseEventHandler<HTMLButtonElement>;
  handleClear: React.MouseEventHandler<HTMLButtonElement>;
  handleUpdateSpeed: (newVal: number) => void;
}

const ControlPanel = ({
                        gameOptions,
                        handleStart,
                        handleStop,
                        handleRandomFill,
                        handleClear,
                        handleUpdateSpeed
}: ControlPanelProps) => {
  const controlButtons: ButtonDefinition[] = useMemo(() => [
    {text: <BsFillPlayFill />, onClick: handleStart, cssProps: {}, buttonProps: {disabled: gameOptions.gameState === GameState.Running}},
    {text: <BsFillStopFill />, onClick: handleStop, cssProps: {}, buttonProps: {disabled: gameOptions.gameState === GameState.Stopped}},
    {text: <TbArrowsRandom />, onClick: handleRandomFill, cssProps: {}},
    {text: <AiOutlineClear />, onClick: handleClear, cssProps: {}}
  ], [handleStart, handleStop, handleRandomFill, handleClear, gameOptions]);

  const handleSpeedChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleUpdateSpeed(Number(value));
  }, [handleUpdateSpeed]);

  const handleSpeedUp = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const newVal = gameOptions.speed + 100;
    handleUpdateSpeed(newVal);
  }, [handleUpdateSpeed, gameOptions]);

  const handleSpeedDown = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const newVal = gameOptions.speed - 100;
    handleUpdateSpeed(newVal);
  }, [handleUpdateSpeed, gameOptions]);

  return (
    <div className='control-panel'>
      <ButtonGroup
        buttons={controlButtons}
        buttonStyleProps={{
          width: '50px'
        }}
      />

      <div className='speed-selector'>
        <button onClick={handleSpeedUp}><IoAdd /></button>
        <input
          value={gameOptions.speed}
          onChange={handleSpeedChange}
        />
        <button onClick={handleSpeedDown}><IoRemove /></button>
      </div>

      <button><CiSettings/></button>
    </div>
  );
}

export default ControlPanel;