import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Icon,
  Upload,
  message,
  Spin,
  Form,
  Input,
  Select,
} from 'antd';
import './index.scss';
import PreviewItem from './PreviewItem';
import AuthAxios from '../../../utils/AuthAxios'

const { Dragger } = Upload;

const MAX_IMAGES = 4;

const AddProduct = ({ form, planeCategories: categoryList }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // fetch api categories
    AuthAxios.CreateInstance().get('/api/sizes')
      .then(response => {
        setSizes(response.data.sizes);
      })
      .catch(err => {

      })
    AuthAxios.CreateInstance().get('/api/brands')
      .then(response => {
        setBrands(response.data.brands);
      })
      .catch(err => {

      })
    AuthAxios.CreateInstance().get('/api/colors')
      .then(response => {
        setColors(response.data.colors);
      })
      .catch(err => {

      })
  }, []);

  // get leaf categories
  let categories = null;
  categories = categoryList.filter(val => val.isLeaf === true);

  const { getFieldDecorator, validateFields, getFieldValue } = form;
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/whrkh4r4',
    showUploadList: false,
    beforeUpload(file, fileList) {
      setLoading(true);
      return true;
    },
    onChange(info) {
      const { status, originFileObj } = info.file;

      if (status === 'done' || status === 'error') {
        const listPhotos = [...photos];
        listPhotos.push(originFileObj);
        setPhotos(listPhotos);

        setLoading(false);
      }
    },
  };

  const handleRemove = idx => {
    let temp = [...photos];
    temp = temp.filter((val, index) => index !== idx);
    setPhotos(temp);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    validateFields(function (err) {
      if (!err) {
        // submit

      }
    })
  }

  return (
    <div className='add_new_product'>
      <Row gutter={20} type='flex' align='middle'>
        <Col span={4} className='form-title'>
          Photos
        </Col>
        <Col span={16}>
          <div className='upload-imgs'>
            <div className='list_dropzone'>
              {photos &&
                photos.map((val, i) => (
                  <div className='dropzone' key={i}>
                    <PreviewItem
                      sourceItem={val}
                      idx={i}
                      handleRemove={handleRemove}
                    />
                  </div>
                ))}

              {photos && photos.length < MAX_IMAGES && (
                <div className='dropzone'>
                  <Dragger {...props}>
                    <Spin spinning={loading} size='large' tip='Uploading...'>
                      <div className='dropzone_wrapper'>
                        <div className='center'>
                          <Icon type='plus-circle' theme='filled' />
                          <p>Add photo</p>
                        </div>
                      </div>
                    </Spin>
                  </Dragger>
                </div>
              )}
            </div>
            <p className='hint'>
              You can add up to 8 photos. The 1st photo will be set as cover
              (main photo).
            </p>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: 20 }}>
        <Form className='form-add' onSubmit={handleFormSubmit}>
          <Row gutter={20} type='flex' align='middle' className='form-field'>
            <Col span={4} className='form-title'>
              Name
            </Col>
            <Col span={16}>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('productName', {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required!',
                    },
                  ],
                })(<Input type='text' placeholder='Product name' size='large' />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} type='flex' align='middle' className='form-field'>
            <Col span={4} className='form-title'>
              Categories
            </Col>
            <Col span={16}>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('productCategories', {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required!',
                    },
                  ],
                })(
                  <Select
                    mode='tags'
                    style={{ width: '100%' }}
                    placeholder='Categories'
                    size='large'
                    showArrow={true}
                    suffixIcon={<Icon type='caret-down' theme='filled' />}>

                    {categories && categories.map(val => <Select.Option key={`${val._id}`}>{val.name}</Select.Option>)}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} type='flex' align='middle' className='form-field'>
            <Col span={4} className='form-title'>
              Brand
            </Col>
            <Col span={16}>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('productBrand', {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required!',
                    },
                  ],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder='Brands'
                    size='large'
                    showArrow={true}
                    suffixIcon={<Icon type='caret-down' theme='filled' />}>
                    {brands && brands.map(val => <Select.Option key={`${val._id}`} value={`${val._id}`}>{val.name}</Select.Option>)}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} type='flex' align='middle' className='form-field'>
            <Col span={4} className='form-title'>
              Price ($)
            </Col>
            <Col span={16}>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('productPrice', {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required!',
                    },
                    {
                      validator: function (rule, value, cb) {
                        const pattern = /^\d*\.?\d*$/;
                        if (pattern.test(value)) {
                          return cb();
                        }
                        return cb('Field is not valid!');
                      }
                    }
                  ],
                })(
                  <Input placeholder='Price' size='large' />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} type='flex' align='middle' className='form-field'>
            <Col span={4} className='form-title'>
              Sizes
            </Col>
            <Col span={16}>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('productSizes', {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required!',
                    },
                  ],
                })(
                  <Select
                    mode='tags'
                    style={{ width: '100%' }}
                    placeholder='Sizes'
                    size='large'
                    showArrow={true}
                    suffixIcon={<Icon type='caret-down' theme='filled' />}>
                    {sizes && sizes.map(val => <Select.Option key={`${val._id}`} value={`${val._id}`}>{val.name}</Select.Option>)}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} type='flex' align='middle' className='form-field'>
            <Col span={4} className='form-title'>
              Colors
            </Col>
            <Col span={16}>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('productColors', {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required!',
                    },
                  ],
                })(
                  <Select
                    mode='tags'
                    style={{ width: '100%' }}
                    placeholder='Colors'
                    size='large'
                    showArrow={true}
                    suffixIcon={<Icon type='caret-down' theme='filled' />}>
                    {colors && colors.map(val => <Select.Option key={`${val._id}`} value={`${val._id}`}>{val.name}</Select.Option>)}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} type='flex' align='middle' className='form-field'>
            <Col span={4} className='form-title'>
              Quantity
            </Col>
            <Col span={16}>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('productQuantity', {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required!',
                    },
                    {
                      validator: function (rule, value, cb) {
                        const pattern = /^\d*\.?\d*$/;
                        if (pattern.test(value)) {
                          return cb();
                        }
                        return cb('Field is not valid!');
                      }
                    }
                  ],
                })(
                  <Input type='text' size='large' placeholder='Quantity' />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} type='flex' align='middle' className='form-field'>
            <Col span={4} className='form-title'>
              Description
            </Col>
            <Col span={16}>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('productDescription', {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required!',
                    }
                  ],
                })(
                  <Input.TextArea type='text' size='large' placeholder='Description' />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} style={{ marginTop: 30 }}>
            <Col span={4} />
            <Col span={16} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className='btn-seller bg-white'>Cancle</button>
              <button type='submit' className='btn-seller bg-orange' style={{ marginLeft: 20 }} onClick={handleFormSubmit}>Complete</button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

const WrappedAddProduct = Form.create('form_add')(AddProduct);

export default WrappedAddProduct;
