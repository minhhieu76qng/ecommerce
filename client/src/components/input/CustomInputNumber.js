import React, { useState } from 'react';
import { Input, Button, InputNumber } from 'antd';
import './index.scss';

const InputGroup = Input.Group;

const CustomInputNumber = ({ passValue, maxValue, defaultValue = 1 }) => {
  const [value, setValue] = useState(defaultValue);

  console.log('a');

  const onDown = () => {
    let temp = 0;
    if (value <= 1) {
      temp = 1;
    } else {
      temp = value - 1;
    }
    setValue(temp);
    passValue(temp);
  };

  const onUp = () => {
    let temp = 0;
    if (value >= maxValue) {
      temp = maxValue;
    } else {
      temp = value + 1;
    }
    setValue(temp);
    passValue(temp);
  };

  return (
    <InputGroup
      className='custom-input-number'
      compact
      style={{ maxWidth: 110 }}>
      <Button onClick={onDown} style={{ width: '20%' }}>
        -
      </Button>
      <InputNumber
        value={value}
        style={{ width: '40%' }}
        min={1}
        max={maxValue}
        defaultValue={defaultValue}
      />
      <Button onClick={onUp} style={{ width: '20%' }}>
        +
      </Button>
    </InputGroup>
  );
};

export default CustomInputNumber;
