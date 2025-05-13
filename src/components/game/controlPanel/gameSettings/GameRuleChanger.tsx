import React, {useState} from "react";
import {GameRules} from "../../Game";

interface GameRuleChangerProps {
  current: GameRules,
  onChange: (newVal: GameRules) => void
}

type CellState = 'dead'|'alive'|'spawn';

const getCellState = (rules: GameRules, n: number) => {
  if(rules.dead.includes(n)) {
    return 'dead';
  }

  if(rules.spawn.includes(n)) {
    return 'spawn';
  }

  return 'alive';
}

const mapRulesToArray = (rules: GameRules): CellState[] => {
  const result: CellState[] = [];

  for(let i = 0; i <= 8; i++) {
    result[i] =getCellState(rules, i);
  }

  return result;
}

const mapArrayToRules = (array: CellState[]): GameRules => {
  const matchCells = (state: CellState) => {
    return array.reduce((prev, curr, index) => {
      if(curr === state) {
        prev.push(index);
      }

      return prev;
    }, [] as number[]);
  }

  return {
    dead: matchCells('dead'),
    alive: matchCells('alive'),
    spawn: matchCells('spawn'),
  }
}

const GameRuleChanger = ({current, onChange}: GameRuleChangerProps) => {
  const [values, setValues] = useState(mapRulesToArray(current));

  const updateCell = (state: CellState, n: number) => {
    setValues(prev => {
      const newArr = [...prev];
      newArr[n] = state;

      onChange(mapArrayToRules(newArr));

      return newArr;
    });
  }

  const genButton = (current: CellState, updateState: CellState, index: number) => {
    return (
      <button
        className={current === updateState ? 'active' : ''}
        onClick={() => updateCell(updateState, index)}
      >
        {updateState}
      </button>
    );
  }

  return (
    <div>
      {
        values.map((value, i) => (
          <div key={i} className='button-group'>
            <div className='label'>{i}</div>
            {genButton(value, 'dead', i)}
            {genButton(value, 'spawn', i)}
            {genButton(value, 'alive', i)}
          </div>
        ))
      }
    </div>
  );
}

export default GameRuleChanger;