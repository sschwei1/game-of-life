import React from 'react';
import CellContainer from './CellContainer';
import {useCallback, useEffect, useRef, useState} from 'react';

import '../../styles/game.less';
import {ControlPanel} from './controlPanel';

interface GameProps {

}

export enum GameState {
  Stopped,
  Running
}

interface GameRules {
  dead: number[];
  alive: number[];
  spawn: number[];
}

export interface GameOptions {
  gameState: GameState;
  width: number;
  height: number;
  speed: number;
  minSpeed: number;
  randomizerDensity: number;
  gameRules: GameRules;
}

const defaultGameOptions: GameOptions = {
  gameState: GameState.Stopped,
  width: 25,
  height: 25,
  speed: 200,
  minSpeed: 10,
  randomizerDensity: 0.3,
  gameRules: {
    dead: [0,1,4,5,6,7,8],
    alive: [2],
    spawn: [3]
  }
}


const Game = ({}: GameProps) => {
  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);
  const [cells, setCells] = useState<boolean[]>([]);

  const intervalRef = useRef<number|null>(null);

  const {
    width,
    height,
    speed,
    gameState,
    gameRules
  } = gameOptions;

  const handleCellUpdate = useCallback((newVal: boolean, position: number) => {
    setCells(prev => {
      prev[position] = newVal;
      return [...prev];
    });
  }, []);

  const countNeighbours = useCallback((x: number, y: number) => {
    let cnt = 0;

    for(let xMod = -1; xMod <= 1; xMod++) {
      for(let yMod = -1; yMod <= 1; yMod++) {
        const currX = x + xMod;
        const currY = y + yMod;

        if(
          (xMod === 0 && yMod === 0) ||
          (currX < 0 || currX >= width) ||
          (currY < 0 || currX >= height)
        ) {
          continue;
        }

        if(cells[currY * width + currX]) cnt++;
      }
    }

    return cnt;
  }, [cells, width, height]);

  const calcNextIteration = useCallback(() => {
    const newCells: boolean[] = [];

    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        const neighbourCnt = countNeighbours(x, y);


        if(gameRules.dead.includes(neighbourCnt)) {
          newCells[y * width + x] = false;
        } else if(gameRules.alive.includes(neighbourCnt)) {
          newCells[y * width + x] = cells[y * width + x];
        } else if(gameRules.spawn.includes(neighbourCnt)) {
          newCells[y * width + x] = true;
        }
      }
    }

    setCells(newCells);
  }, [cells, width, height]);

  useEffect(() => {
    const newCells = new Array(height * width);
    newCells.fill(false);
    setCells(newCells);
  }, []);

  useEffect(() => {
    if(intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if(gameState !== GameState.Running) return;

    intervalRef.current = setInterval(() => {
      calcNextIteration();
    }, speed);
  }, [gameState, speed, intervalRef, calcNextIteration]);

  return (
    <div className='game-container'>
      <h1 className='title'>Game of Life</h1>
      <ControlPanel
        gameOptions={gameOptions}
        updateGameOptions={setGameOptions}
        updateCells={setCells}
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