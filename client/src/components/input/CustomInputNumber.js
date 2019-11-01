import React, { useState } from 'react';
import { Input, Button, Row, Col, InputNumber } from 'antd';
import './index.scss';

const InputGroup = Input.Group;

const CustomInputNumber = ({ passValue, maxValue, ...props }) => {
  const [value, setValue] = useState(1);

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
        defaultValue={1}
      />
      <Button onClick={onUp} style={{ width: '20%' }}>
        +
      </Button>
    </InputGroup>
  );
};

export default CustomInputNumber;
