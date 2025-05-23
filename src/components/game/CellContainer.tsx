import React, { useRef } from 'react';
import {CSSProperties, useMemo} from 'react';
import Cell from './Cell';

interface CellContainerProps {
  cells: boolean[];
  width: number;
  height: number;
  updateCell: (newVal: boolean, position: number) => void
}

const CellContainer = ({cells, width, height, updateCell}: CellContainerProps) => {
  const cellsMatchDimension: boolean = useMemo<boolean>(() => {
    return cells.length === width * height;
  }, [cells, width, height]);

  const containerStyleProps = useMemo<CSSProperties>(() => ({
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`
  }), [height, width]);

  const cellDragValue = useRef<boolean>(false);

  return cellsMatchDimension ? (
    <div
      className='cell-container'
      style={containerStyleProps}
    >
      {
        cells.map((val, index) => (
          <Cell
            key={index}
            value={val}
            position={index}
            updateCell={updateCell}
            cellDragValue={cellDragValue}
          />
        ))
      }
    </div>
  ) : (
    <div>
      Amount of cells do not match Width/Height
    </div>
  )
}

export default  CellContainer;