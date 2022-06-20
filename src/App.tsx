import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Iconfont from 'react-native-vector-icons/Iconfont';
import { registerCustomIconType } from '@rneui/themed';

import { StoreProvider } from '@/hook/useStore';
import AppRouter from '@/router';

export default () => {
  registerCustomIconType('iconfont', Iconfont);
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StoreProvider>
          <AppRouter />
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
