import React, { useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import Compressor from 'compressorjs';

import '@/styles/imageupload.css';

export default ({ onChange, onRemove, value }: any) => {
  const [images, setImages] = React.useState(value);
  const [hasOriginCover, setHasOriginCover] = React.useState(false);

  useEffect(() => {
    console.log(value);
    if (value) {
      setImages([
        {
          data_url: value,
        },
      ]);
      setHasOriginCover(true);
      onChange('');
    }
  }, []);

  const handleChange = (imageList, addUpdateIndex) => {
    // console.log(imageList, addUpdateIndex);
    if (imageList.length === 0) {
      setImages([]);
      return;
    }
    new Compressor(imageList[0].file, {
      strict: true,
      checkOrientation: true,
      maxWidth: undefined,
      maxHeight: undefined,
      minWidth: 0,
      minHeight: 0,
      width: 640,
      height: 360,
      resize: 'cover',
      quality: NaN,
      mimeType: '',
      convertTypes: 'image/png',
      convertSize: 5000000,
      success(result) {
        console.log(result);
        setImages([
          {
            file: result,
            data_url: URL.createObjectURL(result),
          },
        ]);
        onChange(result);
        onRemove(false);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  function handleRemove() {
    if (hasOriginCover) {
      onRemove(true);
    }
  }

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
              <span
                className="remove-btn"
                onClick={(e) => {
                  onImageRemove(0);
                  handleRemove();
                  e.stopPropagation();
                }}
              >
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
