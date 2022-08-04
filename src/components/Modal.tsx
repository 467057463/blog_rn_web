import React from 'react';
import { Overlay } from '@rneui/themed';
import { Text, StyleSheet } from 'react-native';

export default ({ visible, text, position }) => {
  const positionStyle = {
    [position]: 20,
  };

  return (
    <Overlay
      isVisible={visible}
      overlayStyle={[styles.overlayStyle, positionStyle]}
    >
      <Text style={styles.text}>{text}</Text>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlayStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 40,
    position: 'absolute',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
});
