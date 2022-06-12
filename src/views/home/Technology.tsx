import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import { action } from 'mobx';

export default observer(() => {
  const { userStore, articleStore } = useStore();

  return (
    <View>
      <Button title="GO DETAILS" />
    </View>
  );
});
