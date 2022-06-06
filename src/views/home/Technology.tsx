import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Button, ThemeProvider } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import BigButton from '@/components/BigButton';
import { useStore } from '@/hook/useStore';

interface Props {
  navigation: any;
}

export default observer(({ navigation }: Props) => {
  const { user } = useStore();

  return (
    <View>
      <Text>
        {Platform.OS} {user.state}
      </Text>
      <BigButton />
      <Button title="GO BACK" onPress={() => navigation.goBack()} />
      <Button
        title="GO DETAILS"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
});
