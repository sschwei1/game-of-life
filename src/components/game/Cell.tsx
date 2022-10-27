import {MouseEvent} from 'react';
import classNames from 'classnames';

interface CellProps {
  value: boolean;
  position: number;
  updateCell: (newVal: boolean, position: number) => void
}

let currentDragValue = true;

const Cell = ({value, position, updateCell}: CellProps) => {
  const cellClasses = classNames({
    'cell': true,
    'active': value
  });

  const handleCellMouseDown = () => {
    currentDragValue = !value;
    updateCell(currentDragValue, position);
  }

  const handleCellMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    if(event.buttons !== 1) return;

    updateCell(currentDragValue, position);
  }

  return (
    <div
      // style={{width: '50px', height:'50px'}}
      className={cellClasses}
      draggable={false}
      onMouseDown={handleCellMouseDown}
      onMouseEnter={handleCellMouseOver}
    />
  )
}

export default Cell;