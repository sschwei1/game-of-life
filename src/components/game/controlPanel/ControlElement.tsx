import * as React from "react";

interface ControlElementProps {
  title?: string;
  children?: React.ReactNode;
  alignment?: 'start'|'center'|'end';
}

const ControlElement = ({title, children, alignment = 'start'}: ControlElementProps) => {
  return (
    <div className='control-element' style={{alignItems: alignment}}>
      <div>
        {title}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

export default ControlElement;