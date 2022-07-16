import React from 'react';
import { Overlay } from '@rneui/themed';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
// import Modal from 'modal-react-native-web';

export default ({ visible }) => {
  return (
    <Overlay
      // ModalComponent={Modal}
      isVisible={visible}
      overlayStyle={styles.overlayStyle}
    >
      <ActivityIndicator color="#007aff" size="large" style={styles.icon} />
      <Text style={styles.text}>加载中...</Text>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 10,
  },
  overlayStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 100,
    height: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    marginTop: 15,
  },
});
