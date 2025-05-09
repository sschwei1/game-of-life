import React from 'react'; 

type onChangeFuncType = (value: string) => void

interface InputProps {
  label?: string;
  value: string;
  onChange?: onChangeFuncType;
  isDirty?: boolean;
}

const Input = ({label, value, onChange, isDirty = false}: InputProps) => {
  return (
    <div>
      { label && <div>{label}</div> }
      <input
        value={value}
        className={isDirty ? 'dirt' : 'clean'}
        onChange={(evt) => { if(onChange) onChange(evt?.target?.value)}} />
    </div>
  );
}

export default Input;