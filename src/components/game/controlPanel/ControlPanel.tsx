import {ButtonDefinition, ButtonGroup} from '../../button';
import {
  AiOutlineClear,
  BsFillPlayFill,
  BsFillStopFill,
  CiSettings,
  TbArrowsRandom
} from 'react-icons/all';
import React, {useMemo} from 'react';
import {GameOptions, GameState} from '../Game';
import SpeedSelector from "./SpeedSelector";
import ControlElement from "./ControlElement";

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
    {text: <BsFillPlayFill />, title: 'Start', onClick: handleStart, cssProps: {}, buttonProps: {disabled: gameOptions.gameState === GameState.Running}},
    {text: <BsFillStopFill />, title: 'Stop', onClick: handleStop, cssProps: {}, buttonProps: {disabled: gameOptions.gameState === GameState.Stopped}},
    {text: <TbArrowsRandom />, title: 'Randomize Cells', onClick: handleRandomFill, cssProps: {}},
    {text: <AiOutlineClear />, title: 'Clear Cells', onClick: handleClear, cssProps: {}}
  ], [handleStart, handleStop, handleRandomFill, handleClear, gameOptions]);
  return (
    <div className='control-panel'>
      <ControlElement title='Actions'>
        <ButtonGroup
          buttons={controlButtons}
          buttonStyleProps={{
            width: '50px'
          }}
        />
      </ControlElement>

      <ControlElement title='Time per iteration' alignment='center'>
        <SpeedSelector
          handleUpdateSpeed={handleUpdateSpeed}
          speed={gameOptions.speed}
        />
      </ControlElement>

      <ControlElement>
        <button><CiSettings/></button>
      </ControlElement>
    </div>
  );
}

export default ControlPanel;