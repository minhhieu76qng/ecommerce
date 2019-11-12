import React, { useEffect, useState } from 'react';
import { Icon } from 'antd';

const PreviewItem = ({ sourceItem, idx, handleRemove }) => {
  const [imgUrl, setImgUrl] = useState(null);
  var reader = new FileReader();

  reader.addEventListener(
    'load',
    function() {
      setImgUrl(reader.result);
    },
    false,
  );

  if (sourceItem) {
    reader.readAsDataURL(sourceItem);
  }

  // imgUrl = window.URL.createObjectURL(sourceItem);
  return (
    <div className='preview_item dropzone_wrapper'>
      <button className='btn remove' onClick={() => handleRemove(idx)}>
        <Icon type='close' />
      </button>
      <img src={imgUrl} alt='img' />
    </div>
  );
};

export default PreviewItem;
