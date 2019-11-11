import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uuidv1 from 'uuid/v1'
import './index.scss';
import { Collapse, Icon, Button, Checkbox, Slider } from 'antd';

const Filter = () => {

  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [brands, setBrands] = useState(null);

  // lấy size, color, brand
  // lay size
  useEffect(() => {
    axios.get('/api/brands')
      .then(response => {
        setBrands(response.data.brands);
      })
      .catch(err => {

      })

    axios.get('/api/colors')
      .then(response => {
        setColors(response.data.colors);
      })
      .catch(err => {

      })

    axios.get('/api/sizes')
      .then(response => {
        setSizes(response.data.sizes);
      })
      .catch(err => {

      })
  }, [])

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
          <div>
            {sizes &&
              sizes.map(val => <Button key={uuidv1()} className='btn-size'>{val.name}</Button>)
            }
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Color'>
          <div>
            {colors && colors.map(val => (
              <Button
                className='btn-color'
                style={{ background: `${val.value}` }} />
            ))}
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Brand'>
          <div style={{ paddingTop: 10 }}>
            {brands && (
              <ul className='list-filter'>
                {brands.map(val => (
                  <li>
                    <Checkbox className='checkbox'>{val.name}</Checkbox>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Price'>
          <div style={{ padding: '10px 10px 0' }}>
            <Slider
              range
              className='slider'
              marks={{
                0: '$0',
                300: '$300',
              }}
              defaultValue={[0, 300]}
              min={0}
              max={300}
            />
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Available'>
          <div style={{ paddingTop: 10 }}>
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
