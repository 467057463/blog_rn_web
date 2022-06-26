import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// root 路由参数
export type RootStackParamsList = {
  // Home: NavigatorScreenParams<HomeParamsList>;
  Technology: undefined;
  Life: undefined;
  About: undefined;
  Details: {
    id: string;
  };
  Login: undefined;
};

// home 路由参数
export type HomeParamsList = {
  Technology: undefined;
  Life: undefined;
  About: undefined;
  Details: {
    id: string;
  };
};

//
export type ScreenProps<name extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, name>;
