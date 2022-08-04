import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Iconfont from 'react-native-vector-icons/Iconfont';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { registerCustomIconType } from '@rneui/themed';
import { ToastProvider } from 'react-native-toast-notifications';

import { StoreProvider } from '@/hook/useStore';
import AppRouter from '@/router';

export default () => {
  registerCustomIconType('iconfont', Iconfont);
  registerCustomIconType('MaterialIcons', MaterialIcons);
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StoreProvider>
          <ToastProvider>
            <AppRouter />
          </ToastProvider>
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
