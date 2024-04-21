import React from 'react';

interface SettingSectionProps {
  title?: string;
  children?: React.ReactNode;
}

const SettingSection = ({
  children,
  title
}: SettingSectionProps) => {
  return (
    <div className='section'>
      { title && <h2>{title}</h2>}
      <div>
        {children}
      </div>
    </div>
  );
}

export default SettingSection;