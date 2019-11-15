import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Collapse, Icon, Checkbox, Slider, Button } from 'antd';
import axios from 'axios';
import './index.scss';

const initialQuery = { size: null, color: null, brands: [], price: { from: null, to: null }, available: { instock: null, outstock: null } };

function createQueryString(queryObject) {
  let queryString = '';

  if (!queryObject) return '';

  if (queryObject.size) {
    queryString += `&size=${queryObject.size}`;
  }
  if (queryObject.color) {
    queryString += `&color=${queryObject.color}`;
  }

  if (queryObject.brands && queryObject.brands.length !== 0) {
    queryObject.brands.map(val => {
      queryString += `&brand=${val}`;
    })
  }

  if (queryObject.price && queryObject.price.from && queryObject.price.to) {
    queryString += `&priceFrom=${queryObject.price.from}&priceTo=${queryObject.price.to}`
  }

  if (queryObject.available && (queryObject.available.instock || queryObject.available.outstock)) {
    if (queryObject.available.instock) {
      queryString += `&instock=${true}`;
    }
    if (queryObject.available.outstock) {
      queryString += `&outstock=${true}`;
    }
  }

  return queryString;
}


const Filter = ({ handleFilter }) => {
  const { id: cateID } = useParams();

  const [queryObject, setQueryObject] = useState(initialQuery);


  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [brands, setBrands] = useState(null);

  // lấy size, color, brand
  // lay size
  useEffect(() => {
    axios
      .get('/api/brands')
      .then(response => {
        setBrands(response.data.brands);
      })
      .catch(err => { });

    axios
      .get('/api/colors')
      .then(response => {
        setColors(response.data.colors);
      })
      .catch(err => { });

    axios
      .get('/api/sizes')
      .then(response => {
        setSizes(response.data.sizes);
      })
      .catch(err => { });
  }, []);

  const onButtonSizeClick = sizeId => {
    const temp = { ...initialQuery, size: sizeId };

    setQueryObject(temp);

    // goi ham handleFilter
    handleFilter(createQueryString(temp));
  }

  const onButtonColorClick = colorId => {
    const temp = { ...initialQuery, color: colorId };

    setQueryObject(temp);

    // goi ham handleFilter
    handleFilter(createQueryString(temp));
  }

  const onCheckboxBrandsChange = (event, brandId) => {
    const { checked } = event.target;
    let brandTemp = null;
    if (checked) {
      brandTemp = [...queryObject.brands, brandId];
    } else {
      brandTemp = [...queryObject.brands];
      brandTemp = brandTemp.filter(val => val !== brandId);
    }

    const temp = { ...initialQuery, brands: brandTemp };
    setQueryObject(temp);

    // // goi ham handleFilter
    handleFilter(createQueryString(temp));
  }

  const onPriceChange = (value) => {
    const temp = { ...initialQuery, price: { from: value[0], to: value[1] } }

    setQueryObject(temp);
    handleFilter(createQueryString(temp));
  }

  const onCheckboxAvailableChange = event => {
    const availableTemp = { ...queryObject.available };

    if (event.target.checked) {
      if (event.target.name === 'instock') {
        availableTemp.instock = true;
      }
      if (event.target.name === 'outstock') {
        availableTemp.outstock = true;
      }
    } else {
      if (event.target.name === 'instock') {
        availableTemp.instock = false;
      }
      if (event.target.name === 'outstock') {
        availableTemp.outstock = false;
      }
    }

    const temp = { ...initialQuery, available: availableTemp };
    setQueryObject(temp);

    // goi ham handleFilter
    handleFilter(createQueryString(temp));
  }

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
              sizes.map(val => (
                <Button
                  key={val._id}
                  onClick={() => onButtonSizeClick(val._id)}
                  className='btn-size'>
                  {val.name}
                </Button>
              ))}
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Color'>
          <div>
            {colors &&
              colors.map(val => (
                <Button
                  key={val._id}
                  onClick={() => onButtonColorClick(val._id)}
                  className='btn-color'
                  style={{ background: `${val.value}` }}
                />
              ))}
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Brand'>
          <div style={{ paddingTop: 10 }}>
            {brands && (
              <ul className='list-filter'>
                {brands.map(val => (
                  <li key={val._id}>
                    <Checkbox
                      key={val._id}
                      onChange={event => onCheckboxBrandsChange(event, val._id)}
                      className='checkbox'>
                      {val.name}
                    </Checkbox>
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
              onAfterChange={onPriceChange}
            />
          </div>
        </Collapse.Panel>
        <Collapse.Panel className='panel' header='Available'>
          <div style={{ paddingTop: 10 }}>
            <ul className='list-filter'>
              <li>
                <Checkbox className='checkbox' name='instock' onChange={event => onCheckboxAvailableChange(event)}>In-store</Checkbox>
              </li>
              <li>
                <Checkbox className='checkbox' name='outstock' onChange={event => onCheckboxAvailableChange(event)}>Out of stock</Checkbox>
              </li>
            </ul>
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default Filter;
