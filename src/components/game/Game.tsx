import CellContainer from './CellContainer';
import {useCallback, useEffect, useState} from 'react';

import '../../styles/game.less';
import ControlPanel from './ControlPanel';

interface GameProps {

}

export enum GameState {
  Stopped,
  Running
}

export interface GameOptions {
  gameState: GameState;
  width: number;
  height: number;
  speed: number;
  minSpeed: number;
}

const defaultGameOptions: GameOptions = {
  gameState: GameState.Stopped,
  width: 25,
  height: 25,
  speed: 1000,
  minSpeed: 100
}

const Game = ({}: GameProps) => {
  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);
  const [cells, setCells] = useState<boolean[]>([]);

  const handleStart = useCallback(() => {
    setGameOptions(prev => {
      prev.gameState = GameState.Running;
      return {...prev};
    });
  }, []);

  const handleStop = useCallback(() => {
    setGameOptions(prev => {
      prev.gameState = GameState.Stopped;
      return {...prev};
    });
  }, []);

  const handleRandomFill = useCallback(() => {
    const newCells: boolean[] = [];
    const totalCells = gameOptions.width * gameOptions.height;

    for(let i = 0; i < totalCells; i++) {
      newCells.push(Math.random() < 0.5);
    }

    setCells(newCells);
  }, []);

  const handleClear = useCallback(() => {
    const newCells: boolean[] = [];
    const totalCells = gameOptions.width * gameOptions.height;

    for(let i = 0; i < totalCells; i++) {
      newCells.push(false);
    }

    setCells(newCells);
  }, []);

  const handleCellUpdate = useCallback((newVal: boolean, position: number) => {
    setCells(prev => {
      prev[position] = newVal;
      return [...prev];
    });
  }, []);

  const handleUpdateSpeed = useCallback((newVal: number) => {
    if(newVal < gameOptions.minSpeed) {
      newVal = gameOptions.minSpeed;
    }

    setGameOptions(prev => {
      prev.speed = newVal;
      return {...prev};
    })
  }, [gameOptions]);

  useEffect(() => {
    handleClear();
  }, [handleClear]);

  return (
    <div className='game-container'>
      <ControlPanel
        gameOptions={gameOptions}
        handleStart={handleStart}
        handleStop={handleStop}
        handleRandomFill={handleRandomFill}
        handleClear={handleClear}
        handleUpdateSpeed={handleUpdateSpeed}
      />
      <CellContainer
        cells={cells}
        width={gameOptions.width}
        height={gameOptions.height}
        updateCell={handleCellUpdate}
      />
    </div>
  );
}

export default Game;