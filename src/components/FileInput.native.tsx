import React, { useEffect, useRef } from 'react';
import { Image, Text } from '@rneui/themed';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';

export default ({ onChange, onRemove, value }: any) => {
  const [images, setImages] = React.useState();
  const [hasOriginCover, setHasOriginCover] = React.useState(false);
  const pickerRef = useRef<Picker<any>>(null);

  useEffect(() => {
    if (value) {
      setImages(value);
      setHasOriginCover(true);
      onChange('');
    }
  }, []);

  function handleClick() {
    // pickerRef.current?.focus();
    ImagePicker.openPicker({
      width: 640,
      height: 360,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setImages(image.path as any);
      const file = {
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
        name: image.path.split('/').pop(),
        type: 'image/png',
      };
      onRemove(false);
      onChange(file);
    });
    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then((image) => {
    //   console.log(image);
    // });
  }

  function handleRemove(e) {
    if (hasOriginCover) {
      onRemove(true);
    }
    setImages(undefined);
    e.stopPropagation();
  }

  return (
    <View style={styles.uploadWrapper}>
      <TouchableOpacity onPress={handleClick} style={styles.uploadBtn}>
        {!images && <Text>上传图片</Text>}
        {images && (
          <Image
            source={{ uri: images }}
            containerStyle={{ width: 140, height: 79 }}
          />
        )}
        {images && (
          <TouchableOpacity onPress={handleRemove} style={styles.removeBtn}>
            <Text style={{ color: '#fff' }}>X</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Picker ref={pickerRef} style={{ display: 'none' }}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadWrapper: {
    width: 152,
    height: 91,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  uploadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 20,
    height: 20,
    backgroundColor: 'red',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
