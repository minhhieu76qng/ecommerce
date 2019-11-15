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
import FormData from 'form-data';
import './index.scss';
import PreviewItem from './PreviewItem';
import AuthAxios from '../../../utils/AuthAxios';

const { Dragger } = Upload;

const MAX_IMAGES = 4;

const AddProduct = ({ form, planeCategories: categoryList }) => {
  document.title = 'Add new product';

  const [addProductLoading, setAddProductLoading] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // fetch api categories
    AuthAxios.CreateInstance()
      .get('/api/sizes')
      .then(response => {
        setSizes(response.data.sizes);
      })
      .catch(err => {});
    AuthAxios.CreateInstance()
      .get('/api/brands')
      .then(response => {
        setBrands(response.data.brands);
      })
      .catch(err => {});
    AuthAxios.CreateInstance()
      .get('/api/colors')
      .then(response => {
        setColors(response.data.colors);
      })
      .catch(err => {});
  }, []);

  // get leaf categories
  let categories = null;
  categories = categoryList.filter(val => val.isLeaf === true);

  const { getFieldDecorator, validateFields, getFieldValue } = form;
  const props = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:5000/api/products/avatar',
    showUploadList: false,
    accept: '.jpg,.png,.jpeg,.bmp',
    customRequest({ file, onError, onProgress, onSuccess }) {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      return AuthAxios.CreateInstance()
        .post('/api/products/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          onUploadProgress(progressEvent) {
            onProgress(
              {
                percent:
                  Math.round(progressEvent.loaded / progressEvent.total) * 100,
              },
              file,
            );
          },
        })
        .then(response => {
          message.success('Upload successful!');
          const listPhotos = [...photos];
          listPhotos.push(file);
          setPhotos(listPhotos);
          onSuccess(response.data.data, file);

          const temp = [...uploadedPhotos];
          temp.push(response.data.data.location);
          setUploadedPhotos(temp);
        })
        .catch(err => {
          message.success('Upload error!');
          onError(err.response.data.errors);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  };

  const handleRemove = idx => {
    let temp = [...photos];
    temp = temp.filter((val, index) => index !== idx);
    setPhotos(temp);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    validateFields(function(err) {
      if (uploadedPhotos.length === 0) {
        return message.error('You must upload at least one photo!');
      }
      if (!err) {
        // submit
        const productName = getFieldValue('productName');
        const productCategories = getFieldValue('productCategories');
        const productBrand = getFieldValue('productBrand');
        const productPrice = getFieldValue('productPrice');
        const productSizes = getFieldValue('productSizes');
        const productColors = getFieldValue('productColors');
        const productQuantity = getFieldValue('productQuantity');
        const productDescription = getFieldValue('productDescription');
        setAddProductLoading(true);
        AuthAxios.CreateInstance()
          .post('/api/products', {
            productPhotos: uploadedPhotos,
            productName,
            productCategories,
            productBrand,
            productPrice,
            productSizes,
            productColors,
            productQuantity,
            productDescription,
          })
          .then(response => {
            message.success('Add new product successful!');
            setAddProductLoading(false);
          })
          .catch(err => {
            const errors = err.data.errors;
            errors.map(val => message.error(val.msg));
          })
          .finally(() => {
            setAddProductLoading(false);
            resetForm();
          });
      }
    });
  };

  const resetForm = () => {
    const { resetFields } = form;
    setUploadedPhotos([]);
    setPhotos([]);
    resetFields();
  };

  return (
    <Spin spinning={addProductLoading} tip='Adding...' size='large'>
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
                  })(
                    <Input
                      type='text'
                      placeholder='Product name'
                      size='large'
                    />,
                  )}
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
                      {categories &&
                        categories.map(val => (
                          <Select.Option key={`${val._id}`}>
                            {val.name}
                          </Select.Option>
                        ))}
                    </Select>,
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
                      {brands &&
                        brands.map(val => (
                          <Select.Option
                            key={`${val._id}`}
                            value={`${val._id}`}>
                            {val.name}
                          </Select.Option>
                        ))}
                    </Select>,
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
                        validator: function(rule, value, cb) {
                          const pattern = /^\d*\.?\d*$/;
                          if (pattern.test(value)) {
                            return cb();
                          }
                          return cb('Field is not valid!');
                        },
                      },
                    ],
                  })(<Input placeholder='Price' size='large' />)}
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
                      {sizes &&
                        sizes.map(val => (
                          <Select.Option
                            key={`${val._id}`}
                            value={`${val._id}`}>
                            {val.name}
                          </Select.Option>
                        ))}
                    </Select>,
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
                      {colors &&
                        colors.map(val => (
                          <Select.Option
                            key={`${val._id}`}
                            value={`${val._id}`}>
                            {val.name}
                          </Select.Option>
                        ))}
                    </Select>,
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
                        validator: function(rule, value, cb) {
                          const pattern = /^\d*\.?\d*$/;
                          if (pattern.test(value)) {
                            return cb();
                          }
                          return cb('Field is not valid!');
                        },
                      },
                    ],
                  })(<Input type='text' size='large' placeholder='Quantity' />)}
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
                      },
                    ],
                  })(
                    <Input.TextArea
                      type='text'
                      size='large'
                      placeholder='Description'
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20} style={{ marginTop: 30 }}>
              <Col span={4} />
              <Col
                span={16}
                style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={resetForm}
                  type='button'
                  className='btn-seller bg-white'>
                  Cancle
                </button>
                <button
                  type='submit'
                  className='btn-seller bg-orange'
                  style={{ marginLeft: 20 }}
                  onClick={handleFormSubmit}>
                  Complete
                </button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

const WrappedAddProduct = Form.create('form_add')(AddProduct);

export default WrappedAddProduct;
