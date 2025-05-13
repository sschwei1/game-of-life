import React from 'react';
import CellContainer from './CellContainer';
import {useCallback, useEffect, useRef, useState} from 'react';

import '../../styles/game.less';
import {ControlPanel} from './controlPanel';

export enum GameState {
  Stopped,
  Running
}

export interface GameRules {
  dead: number[];
  alive: number[];
  spawn: number[];
}

interface WallRules {
  enabled: boolean;
  countAsAlive: boolean;
}

export interface RangeValue {
  min: number;
  max: number;
  default: number;
  value: number;
}

export interface GameOptions {
  gameState: GameState;
  width: number;
  height: number;
  speed: RangeValue;
  randomizerDensity: number;
  gameRules: GameRules;
  wall: WallRules;
}

const defaultGameOptions: GameOptions = {
  gameState: GameState.Stopped,
  width: 25,
  height: 25,
  speed: {
    value: 200,
    default: 200,
    min: 10,
    max: 5000
  },
  randomizerDensity: 0.3,
  gameRules: {
    dead: [0,1,4,5,6,7,8],
    alive: [2],
    spawn: [3]
  },
  wall: {
    enabled: false,
    countAsAlive: false
  }
}

const countNeighbours = (cells: boolean[], x: number, y: number, gameOptions: GameOptions) => {
  const {width, height, wall} = gameOptions;
  let cnt = 0;

  for(let xMod = -1; xMod <= 1; xMod++) {
    for(let yMod = -1; yMod <= 1; yMod++) {
      if(xMod === 0 && yMod === 0) continue;

      let currX = x + xMod;
      let currY = y + yMod;

      if(!wall.enabled) {
        currX = (currX + width) % width;
        currY = (currY + height) % height;
      }

      if(currX < 0 || currX >= width ||
         currY < 0 || currY >= height) {
        if(wall.countAsAlive) cnt++;
        continue;
      }

      if(cells[currY * width + currX]) cnt++;
    }
  }

  return cnt;
};

const calcNextIteration = (cells: boolean[], gameOptions: GameOptions) => {
  const {width, height, gameRules} = gameOptions;

  const newCells: boolean[] = [];

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      const neighbourCnt = countNeighbours(cells, x, y, gameOptions);

      if(gameRules.dead.includes(neighbourCnt)) {
        newCells[y * width + x] = false;
      } else if(gameRules.alive.includes(neighbourCnt)) {
        newCells[y * width + x] = cells[y * width + x];
      } else if(gameRules.spawn.includes(neighbourCnt)) {
        newCells[y * width + x] = true;
      }
    }
  }

  return newCells;
}

const Game = () => {
  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);
  const [cells, setCells] = useState<boolean[]>([]);

  const intervalRef = useRef<number|null>(null);

  const {
    width,
    height,
    speed,
    gameState
  } = gameOptions;

  const handleCellUpdate = useCallback((newVal: boolean, position: number) => {
    setCells(prev => {
      prev[position] = newVal;
      return [...prev];
    });
  }, []);

  useEffect(() => {
    const newCells = new Array(height * width);
    newCells.fill(false);
    setCells(newCells);
  }, [height, width]);

  const updateToNextIteration = useCallback(() => {
    const newCells = calcNextIteration(cells, gameOptions);
    setCells(newCells);
  }, [cells, gameOptions]);

  useEffect(() => {
    if(intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if(gameState !== GameState.Running) return;

    intervalRef.current = setInterval(updateToNextIteration, speed.value);
  }, [gameState, speed.value, intervalRef, cells, updateToNextIteration]);

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