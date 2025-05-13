import React, {ChangeEvent} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type onChangeFuncType = (value: any) => void

interface InputProps {
  label?: string;
  value: string;
  onChange?: onChangeFuncType;
  isDirty?: boolean;
  inputType?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
}

const Input = ({label, value, onChange, inputType = 'text', disabled = false, isDirty = false}: InputProps) => {
  const innerOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = inputType === 'checkbox' ?
      evt.target.checked : evt.target.value;

    if(onChange) {
      onChange(value);
    }
  }

  const additionalProps: React.HTMLProps<HTMLInputElement> = {};

  if(inputType === 'checkbox') {
    additionalProps.value = '';
    additionalProps.checked = Boolean(value);
  }

  return (
    <div className='form-input'>
      { label && <div>{label}</div> }
      <input
        type={inputType}
        value={value}
        className={isDirty ? 'dirt' : 'clean'}
        onChange={innerOnChange}
        disabled={disabled}
        {...additionalProps}
      />
    </div>
  );
}

export default Input;