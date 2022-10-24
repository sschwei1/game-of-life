import {ButtonDefinition, ButtonGroup} from '../button';
import {AiOutlineClear, BsFillPlayFill, BsFillStopFill, CiSettings, TbArrowsRandom} from 'react-icons/all';
import React, {useMemo} from 'react';

interface ControlPanelProps {
  handleStart: React.MouseEventHandler<HTMLButtonElement>;
  handleStop: React.MouseEventHandler<HTMLButtonElement>;
  handleRandomFill: React.MouseEventHandler<HTMLButtonElement>;
  handleClear: React.MouseEventHandler<HTMLButtonElement>;
}

const ControlPanel = ({
                        handleStart,
                        handleStop,
                        handleRandomFill,
                        handleClear
}: ControlPanelProps) => {
  const controlButtons: ButtonDefinition[] = useMemo(() => [
    {text: <BsFillPlayFill />, onClick: handleStart, cssProps: {}},
    {text: <BsFillStopFill />, onClick: handleStop, cssProps: {}},
    {text: <TbArrowsRandom />, onClick: handleRandomFill, cssProps: {}},
    {text: <AiOutlineClear />, onClick: handleClear, cssProps: {}}
  ], [handleStart, handleStop, handleRandomFill, handleClear]);

  return (
    <div className='control-panel'>
      <ButtonGroup
        buttons={controlButtons}
        buttonStyleProps={{
          width: '50px'
        }}
      />
      <button><CiSettings/></button>
    </div>
  );
}

export default ControlPanel;