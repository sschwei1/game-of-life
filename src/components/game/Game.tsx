import CellContainer from './CellContainer';
import {useCallback, useEffect, useState} from 'react';

import '../../styles/game.less';
import ControlPanel from './ControlPanel';

interface GameProps {

}

interface GameOptions {
  width: number;
  height: number;
}

const defaultGameOptions: GameOptions = {
  width: 25,
  height: 25
}

const Game = ({}: GameProps) => {
  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);
  const [cells, setCells] = useState<boolean[]>([]);

  useEffect(() => {
    const newCells: boolean[] = [];
    const totalCells = gameOptions.width * gameOptions.height;

    for(let i = 0; i < totalCells; i++) {
        newCells.push(false);
    }

    setCells(newCells);
  }, [gameOptions]);

  const handleCellUpdate = useCallback((newVal: boolean, position: number) => {
    setCells(prev => {
      prev[position] = newVal;
      return [...prev];
    });
  }, []);

  return (
    <div className='game-container'>
      <ControlPanel
        handleStart={() => {}}
        handleStop={() => {}}
        handleRandomFill={() => {}}
        handleClear={() => {}}
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