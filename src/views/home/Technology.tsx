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
      <Text>
        {userStore.status}: {userStore.length}
      </Text>
      <Button
        title="GO DETAILS"
        onPress={action(() => console.log(articleStore.getStatus()))}
      />
    </View>
  );
});
