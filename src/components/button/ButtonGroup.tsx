import React, {CSSProperties} from 'react';

interface ButtonGroupProps {
  buttons: ButtonDefinition[];
  buttonStyleProps: CSSProperties;
}

export interface ButtonDefinition {
  text: string|JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  cssProps: CSSProperties;
}

const ButtonGroup = ({buttons, buttonStyleProps}: ButtonGroupProps) => {
  return (
    <div className='button-group'>
      {
        buttons.map(((btn, index) => (
          <button
            key={index}
            onClick={btn.onClick}
            style={{
              ...buttonStyleProps,
              ...btn.cssProps
            }}
          >
            <>{btn.text}</>
          </button>
        )))
      }
    </div>
  );
}

export default ButtonGroup;