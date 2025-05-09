import {ButtonDefinition, ButtonGroup} from '../../button';
import {
  AiOutlineClear,
  BsFillPlayFill,
  BsFillStopFill,
  TbArrowsRandom
} from 'react-icons/all';
import React from 'react';
import {GameOptions, GameState} from '../Game';
import SpeedSelector from "./SpeedSelector";
import ControlElement from "./ControlElement";
import {GameSettings} from './gameSettings';

interface ControlPanelProps {
  gameOptions: GameOptions;
  updateGameOptions: React.Dispatch<React.SetStateAction<GameOptions>>;
  updateCells: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const ControlPanel = ({
                        gameOptions,
                        updateGameOptions,
                        updateCells

}: ControlPanelProps) => {
  const {
    width,
    height,
    speed,
    gameState,
    randomizerDensity
  } = gameOptions;

  const handleStart = () => {
    updateGameOptions(prev => {
      prev.gameState = GameState.Running;
      return {...prev};
    });
  };

  const handleStop = () => {
    updateGameOptions(prev => {
      prev.gameState = GameState.Stopped;
      return {...prev};
    });
  };

  const handleRandomFill = () => {
    const newCells: boolean[] = [];
    const totalCells = width * height;

    for(let i = 0; i < totalCells; i++) {
      newCells.push(Math.random() < randomizerDensity);
    }

    updateCells(newCells);
  };

  const handleClear = () => {
    const newCells: boolean[] = [];
    const totalCells = width * height;

    for(let i = 0; i < totalCells; i++) {
      newCells.push(false);
    }

    updateCells(newCells);
  };

  const handleUpdateSpeed = (newVal: number) => {
    updateGameOptions(prev => {
      prev.speed.value = newVal;
      return {...prev};
    })
  };

  const controlButtons: ButtonDefinition[] = [
    {text: <BsFillPlayFill />, title: 'Start', onClick: handleStart, cssProps: {}, buttonProps: {disabled: gameState === GameState.Running}},
    {text: <BsFillStopFill />, title: 'Stop', onClick: handleStop, cssProps: {}, buttonProps: {disabled: gameState === GameState.Stopped}},
    {text: <TbArrowsRandom />, title: 'Randomize Cells', onClick: handleRandomFill, cssProps: {}},
    {text: <AiOutlineClear />, title: 'Clear Cells', onClick: handleClear, cssProps: {}}
  ];

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
          speed={speed}
        />
      </ControlElement>

      <ControlElement>
        <GameSettings
          gameOption={gameOptions}
          updateGameOptions={updateGameOptions}
        />
      </ControlElement>
    </div>
  );
}

export default ControlPanel;