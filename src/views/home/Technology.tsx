import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';

export default observer(() => {
  const { user } = useStore();

  return (
    <View>
      <Text>
        {user.status}: {user.length}
      </Text>
      <Button title="GO DETAILS" onPress={() => user.login()} />
    </View>
  );
});
