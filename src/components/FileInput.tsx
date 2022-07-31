import React from 'react';
import ImageUploading from 'react-images-uploading';

import '@/styles/imageupload.css';

export default ({ onChange, value }: any) => {
  const [images, setImages] = React.useState(value);

  const handleChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    onChange(imageList[0].file);
  };

  return (
    <ImageUploading
      value={images}
      onChange={handleChange}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper" onClick={onImageUpload}>
          {imageList.length > 0 && (
            <div className="image-wrapper">
              <span className="remove-btn" onClick={() => onImageRemove(0)}>
                X
              </span>
              <img src={imageList[0]['data_url']} alt="" width="140" />
            </div>
          )}
          {imageList.length == 0 && (
            <div className="uploader-button">上传图片</div>
          )}
        </div>
      )}
    </ImageUploading>
  );
};
