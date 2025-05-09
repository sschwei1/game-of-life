import React, {MouseEvent} from 'react';
import classNames from 'classnames';

interface CellProps {
  value: boolean;
  position: number;
  cellDragValue: React.MutableRefObject<boolean>;
  updateCell: (newVal: boolean, position: number) => void
}

const Cell = ({value, position, cellDragValue, updateCell}: CellProps) => {
  const cellClasses = classNames({
    'cell': true,
    'active': value
  });

  const handleCellMouseDown = () => {
    cellDragValue.current = !cellDragValue.current;
    updateCell(cellDragValue.current, position);
  }

  const handleCellMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    if(event.buttons !== 1) return;

    updateCell(cellDragValue.current, position);
  }

  return (
    <div
      className={cellClasses}
      draggable={false}
      onMouseDown={handleCellMouseDown}
      onMouseEnter={handleCellMouseOver}
    />
  )
};

export default React.memo(Cell);