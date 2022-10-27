import React, {CSSProperties} from 'react';

interface ButtonGroupProps {
  buttons: ButtonDefinition[];
  buttonStyleProps: CSSProperties;
}

export interface ButtonDefinition {
  text: string|JSX.Element;
  title?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  cssProps: CSSProperties;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

const ButtonGroup = ({buttons, buttonStyleProps}: ButtonGroupProps) => {
  return (
    <div className='button-group'>
      {
        buttons.map(((btn, index) => (
          <button
            key={index}
            onClick={btn.onClick}
            title={btn.title}
            style={{
              ...buttonStyleProps,
              ...btn.cssProps
            }}
            {...(btn.buttonProps ?? {})}
          >
            <>{btn.text}</>
          </button>
        )))
      }
    </div>
  );
}

export default ButtonGroup;