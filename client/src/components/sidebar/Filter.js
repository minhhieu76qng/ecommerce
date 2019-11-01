import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { Collapse, Icon, Button, Checkbox, Slider } from 'antd';

const Filter = () => {
  return (
    <div className='filter widget-sidebar'>
      <h3 className='title'>Filter</h3>

      <Collapse
        className='filter-list'
        expandIconPosition='right'
        bordered={false}
        accordion={true}
        expandIcon={({ isActive }) => (
          <Icon type='down' rotate={isActive ? 180 : 0} />
        )}>
        <Collapse.Panel className='panel' header='Size'>
          <div style={{ paddingTop: 10 }} >
            <Button className='btn-size'>S</Button>
            <Button className='btn-size'>M</Button>
            <Button className='btn-size'>L</Button>
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Color'>
          <div >
            <Button className='btn-color' style={{ background: '#ff5f6d' }}></Button>
            <Button className='btn-color' style={{ background: 'rgba(255, 213, 67, 0.4)' }}></Button>
            <Button className='btn-color' style={{ background: 'rgba(95, 109, 255, 0.4)' }}></Button>
            <Button className='btn-color' style={{ background: 'rgba(255, 161, 95, 0.4)' }}></Button>
            <Button className='btn-color' style={{ background: 'rgba(61, 61, 63, 0.4)' }}></Button>
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Brand'>
          <div style={{ paddingTop: 10 }} >
            <ul className='list-filter'>
              <li>
                <Checkbox className='checkbox'>brand</Checkbox>
              </li>
              <li>
                <Checkbox className='checkbox'>brand</Checkbox>
              </li>
              <li>
                <Checkbox className='checkbox'>brand</Checkbox>
              </li>
              <li>
                <Checkbox className='checkbox'>brand</Checkbox>
              </li>
            </ul>
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Price'>
          <div style={{ padding: '10px 10px 0' }} >
            <Slider range className='slider' marks={{
              0: '$0',
              300: '$300',
            }} defaultValue={[0, 300]} min={0} max={300} />
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Available'>
          <div style={{ paddingTop: 10 }} >
            <ul className='list-filter'>
              <li>
                <Checkbox className='checkbox'>In-store</Checkbox>
              </li>
              <li>
                <Checkbox className='checkbox'>Out of stock</Checkbox>
              </li>
            </ul>
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default Filter;
